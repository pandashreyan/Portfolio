
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import { formatDistanceToNow } from 'date-fns';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addGuestbookEntry, getGuestbookEntries, GuestbookEntry, GuestbookFormInput } from "./actions";
import { Loader2, MessageSquareText, Send, User, Sparkles } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name cannot exceed 50 characters." }),
  message: z.string().min(5, { message: "Message must be at least 5 characters." }).max(500, { message: "Message cannot exceed 500 characters." }),
});

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

const COLORS = [
  "from-cyan-400 to-blue-500",
  "from-purple-400 to-pink-500",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-orange-500",
];

export default function GuestbookPage() {
  const { toast } = useToast();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<GuestbookFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", message: "" },
  });

  const fetchEntries = async () => {
    setIsLoadingEntries(true);
    try {
      const fetchedEntries = await getGuestbookEntries();
      setEntries(fetchedEntries);
    } catch (error) {
      toast({
        title: "Error fetching entries",
        description: "Could not load guestbook messages. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingEntries(false);
    }
  };

  useEffect(() => {
    fetchEntries();
    setIsMounted(true);
  }, []);

  async function onSubmit(values: GuestbookFormInput) {
    setIsPending(true);
    try {
      const result = await addGuestbookEntry(values);
      if (result.success) {
        toast({
          title: "Message Signed! 🎉",
          description: "Thank you for leaving a note.",
        });
        form.reset();
        await fetchEntries();
      } else {
        toast({
          title: "Error Signing Guestbook",
          description: result.error || result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error Signing Guestbook",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto max-w-4xl py-10 px-4 text-white"
    >
      <motion.div variants={itemVariants} className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
          <MessageSquareText className="h-3.5 w-3.5" />
          <span className="uppercase tracking-wider">Leave a Mark</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black gradient-text-cyan-purple">
          Guestbook
        </h1>
        <p className="text-white/45 max-w-lg mx-auto text-base leading-relaxed">
          Sign my guestbook! Share your thoughts, drop a link to your own portfolio, or just say hello.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ── LEFT: FORM ── */}
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl glass-card border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Sign the Guestbook</h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60 text-sm">Your Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="bg-white/5 border-white/15 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60 text-sm">Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Your message..."
                          {...field}
                          className="bg-white/5 border-white/15 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4" />
                      Signing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Sign Guestbook
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>

        {/* ── RIGHT: ENTRIES ── */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Recent Entries</h2>
              {!isLoadingEntries && (
                <span className="text-xs text-white/40">{entries.length} messages</span>
              )}
            </div>

            {isLoadingEntries ? (
              <div className="flex flex-col justify-center items-center h-48 space-y-4 rounded-2xl glass-card border border-white/5">
                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
                <p className="text-white/40 text-sm">Loading messages...</p>
              </div>
            ) : entries.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-48 rounded-2xl glass-card border border-white/5 text-center px-4">
                <p className="text-white/40 text-sm">No messages yet.</p>
                <p className="text-white/30 text-xs mt-1">Be the first to sign!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {entries.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      whileHover={{ scale: 1.01 }}
                      className="rounded-2xl glass-card border border-white/5 p-5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${COLORS[i % COLORS.length]}`}>
                          <span className="text-white font-bold text-sm">
                            {entry.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-white truncate">{entry.name}</h3>
                            <span className="text-xs text-white/30 whitespace-nowrap">
                              {isMounted
                                ? formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })
                                : entry.timestamp.split("T")[0]
                              }
                            </span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
                            {entry.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
