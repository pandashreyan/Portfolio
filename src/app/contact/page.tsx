
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "./actions";
import { Github, Linkedin, Mail, Send, Code, MapPin, Clock, Sparkles, MessageCircle } from "lucide-react";
import contactPageImage from "@/assets/WhatsApp Image 2024-12-26 at 18.06.21_daf4ed60.jpg";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const contactInfo = [
  { icon: MapPin, label: "Location", value: "Bhubaneswar, India 🇮🇳", color: "text-cyan-400" },
  { icon: Clock, label: "Response Time", value: "Usually within 24 hours", color: "text-green-400" },
  { icon: Mail, label: "Email", value: "pandashreyan7@gmail.com", color: "text-purple-400" },
];

const socialLinks = [
  {
    href: "https://github.com/pandashreyan",
    icon: Github,
    label: "GitHub",
    bg: "hover:bg-white/10",
    color: "hover:text-white",
    border: "hover:border-white/40",
  },
  {
    href: "https://www.linkedin.com/in/shreyan-panda-a4a6aa254/",
    icon: Linkedin,
    label: "LinkedIn",
    bg: "hover:bg-blue-500/10",
    color: "hover:text-blue-400",
    border: "hover:border-blue-400/40",
  },
  {
    href: "https://leetcode.com/u/shreyan1302/",
    icon: Code,
    label: "LeetCode",
    bg: "hover:bg-yellow-500/10",
    color: "hover:text-yellow-400",
    border: "hover:border-yellow-400/40",
  },
];

const containerAnim = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemAnim = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 14 } },
};

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await submitContactForm(values);
      form.reset();
      toast({
        title: "Message Sent! 🎉",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="py-10 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-medium">
          <MessageCircle className="h-3.5 w-3.5" />
          <span className="uppercase tracking-wider">Get In Touch</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black gradient-text-cyan-pink">
          Let&apos;s Connect
        </h1>
        <p className="text-white/45 max-w-md mx-auto text-base leading-relaxed">
          Have a project idea, a question, or just want to say hi? I&apos;m always excited to hear from you!
        </p>
      </motion.div>

      <motion.div
        variants={containerAnim}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8"
      >
        {/* ── LEFT SIDE INFO ── */}
        <motion.div variants={itemAnim} className="lg:col-span-2 space-y-6">
          {/* Profile card */}
          <div className="rounded-2xl glass-card border border-white/10 overflow-hidden shadow-xl">
            <div className="relative h-72 md:h-80 overflow-hidden bg-white/5">
              <Image
                src={contactPageImage}
                alt="Shreyan"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,50%,4%)] via-[hsl(240,50%,4%)]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="font-bold text-white text-xl">Shreyan Panda</h3>
                <p className="text-cyan-400 font-medium text-sm">Full Stack Developer</p>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">{label}</p>
                    <p className="text-white/70 text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="rounded-2xl glass-card border border-white/10 p-5 space-y-3">
            <p className="text-white/30 text-xs uppercase tracking-wider font-semibold">Find me online</p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label, bg, color, border }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border border-white/10 text-white/40 transition-all duration-200 ${bg} ${color} ${border}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Availability badge */}
          <div className="rounded-2xl glass-card border border-green-500/20 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-green-400 font-semibold text-sm">Currently Available</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              Open to internships, freelance projects, and full-time opportunities. Let&apos;s build something amazing together!
            </p>
          </div>
        </motion.div>

        {/* ── RIGHT: FORM ── */}
        <motion.div variants={itemAnim} className="lg:col-span-3">
          <div className="rounded-2xl glass-card border border-white/10 p-6 md:p-8 h-full">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Send a Message</h2>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/60 text-sm">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                            className="bg-white/5 border-white/15 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60 text-sm">Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={7}
                          placeholder="Tell me about your project, idea, or just say hi! 👋"
                          {...field}
                          className="bg-white/5 border-white/15 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20 rounded-xl resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 text-base"
                  >
                    {form.formState.isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>

                <p className="text-center text-white/25 text-xs">
                  Your data is secure and will never be shared.
                </p>
              </form>
            </Form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
