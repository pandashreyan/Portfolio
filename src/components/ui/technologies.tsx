import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb, SiTypescript } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { FaNodeJs } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { motion } from "framer-motion";

const Technologies = () => {
  const technologies = [
    { Icon: RiReactjsLine, color: "#61DAFB", name: "React" },    
    { Icon: SiMongodb, color: "#47A248", name: "MongoDB" },        
    { Icon: DiRedis, color: "#DC382D", name: "Redis" },          
    { Icon: FaNodeJs, color: "#339933", name: "Node.js" },         
    { Icon: BiLogoPostgresql, color: "#336791", name: "PostgreSQL" },
    { Icon: SiTypescript, color: "#007ACC", name: "TypeScript" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      rotateX: -30,
      scale: 0.5
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.1,
      y: -10,
      transition: { 
        duration: 0.3,
        type: "spring",
        bounce: 0.4
      }
    },
    wave: {
      y: [0, -10, 0],
      x: [-5, 5, -5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
      className="border-b border-neutral-800 pb-24"
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h1>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        animate="wave"
        viewport={{ once: false }}
        className="flex flex-wrap items-center justify-center gap-8 perspective-1000"
      >
        {technologies.map(({ Icon, color, name }, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            animate="wave"
            custom={index}
            style={{
              transformStyle: "preserve-3d",
              transition: `delay ${index * 0.1}s`
            }}
            className="group relative rounded-2xl border-2 border-neutral-800 p-6 backdrop-blur-sm bg-opacity-10 bg-white/5 transition-colors hover:border-neutral-700"
          >
            {Icon ? (
              <Icon 
                className="text-7xl transition-transform group-hover:scale-110" 
                style={{ 
                  color,
                  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.2))"
                }} 
              />
            ) : (
              <div className="text-7xl text-neutral-400">Icon Not Available</div>
            )}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 text-sm text-neutral-400">
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Technologies;