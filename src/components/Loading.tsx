
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface LoadingProps {
  percent: number;
}

const Loading = ({ percent }: LoadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }} // Keep visible while loading
      exit={{ opacity: 0 }} // Fade out when isLoading becomes false
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm" // Use high z-index and backdrop
    >
      <div className="text-center space-y-4">
         <h2 className="text-2xl font-semibold text-primary">Loading Portfolio...</h2>
         <Progress value={percent} className="w-64 md:w-96 mx-auto" />
         <p className="text-muted-foreground">{Math.round(percent)}%</p>
      </div>
    </motion.div>
  );
};

export default Loading;
