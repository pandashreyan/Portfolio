
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { generateProjectIdea, ProjectIdeaInput, ProjectIdeaOutput } from '@/ai/flows/project-idea-flow';
import { Lightbulb, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  keywords: z.string().min(3, { message: "Keywords must be at least 3 characters long." }).max(100, { message: "Keywords cannot exceed 100 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const AIProjectGenerator = () => {
  const [idea, setIdea] = useState<ProjectIdeaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setIdea(null);
    try {
      const result = await generateProjectIdea({ keywords: data.keywords });
      setIdea(result);
      toast({
        title: "Idea Generated!",
        description: "Your new project idea is ready.",
      });
    } catch (e) {
      console.error("Error generating project idea:", e);
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Error Generating Idea",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="ai-project-generator"
      className="py-16 md:py-20 bg-background text-foreground"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-highlight-primary mb-4 flex items-center justify-center gap-2"
          variants={sectionVariants}
        >
          <Lightbulb className="h-8 w-8" /> AI Project Idea Generator
        </motion.h2>
        <motion.p className="text-lg text-text-secondary mb-8" variants={sectionVariants}>
          Stuck on what to build next? Enter some keywords, and let Shreyan's AI assistant spark your creativity!
        </motion.p>
        <Card className="bg-card shadow-xl multicolor-border p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Keywords</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., 'image recognition, web app, python'"
                        className="bg-input text-text-primary text-center"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto bg-highlight-primary hover:bg-highlight-primary/90 text-primary-foreground apply-multicolor-background-on-active">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Idea
                  </>
                )}
              </Button>
            </form>
          </Form>
        </Card>

        {error && (
          <motion.div
            className="mt-8 p-4 bg-destructive/10 text-destructive border border-destructive rounded-md flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertTriangle className="h-5 w-5" />
            <p>{error}</p>
          </motion.div>
        )}

        {idea && !error && (
          <motion.div variants={cardVariants} initial="hidden" animate="visible" className="mt-10">
            <Card className="text-left shadow-xl bg-card text-card-foreground multicolor-border">
              <CardHeader>
                <CardTitle className="text-2xl text-highlight-secondary flex items-center gap-2">
                  <Sparkles className="h-6 w-6" /> {idea.title || "Generated Project Idea"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-text-secondary text-base leading-relaxed">{idea.idea}</CardDescription>
                <div>
                  <h4 className="font-semibold text-text-primary mb-2">Suggested Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {idea.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="bg-bg-secondary text-text-secondary hover:bg-highlight-secondary/20 hover:text-highlight-secondary transition-colors">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default AIProjectGenerator;
