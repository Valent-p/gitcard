import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Github, Star, GitCommit, Code, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GitCardProps {
        // Data is a dictionary generated from GitHub.tsx
        data: any;
}

// If direction is 1 (Next): New enters from Right (300), Old exits to Left (-300)
// If direction is -1 (Prev): New enters from Left (-300), Old exits to Right (300)
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300, // Start position
        opacity: 0,
        scale: 0.9,
        zIndex: 0, // Entering slide is behind initially
    }),
    center: {
        zIndex: 1, // Active slide is on top
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300, // Exit position (Inverse of enter)
        opacity: 0,
        scale: 0.9,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    }),
};

const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            delay: 0.2, // Wait for slide to finish
            duration: 0.3 
        } 
    },
};

const SlideWrapper = ({ children, title, bgClass, slide, custom }: any) => (
    <motion.div
        custom={custom}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        // added 'absolute' so slides overlap during transition
        className={`absolute top-0 left-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-2xl border-4 border-white ${bgClass}`}
    >
        {/* Staggered content ;)*/}
        <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={contentVariants} 
            transition={{ staggerChildren: 0.1 }}
            className="flex-1 flex flex-col h-full"
        >
            <div className="flex justify-between items-center opacity-80 mb-4">
                <span className="text-xs font-mono uppercase tracking-widest">GitCard 2026</span>
                
                <Github size={16} />
            </div>
            
            <h2 className="text-2xl font-black uppercase mb-4 text-center tracking-tighter">{title}</h2>
            
            <div className="flex-1 flex flex-col justify-center">
                {children}
            </div>
        </motion.div>
        
        {/* Dots - Manually placed at bottom to avoid layout shift */}
        <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`h-1 rounded-full transition-all ${i === slide ? "w-8 bg-white" : "w-2 bg-white/30"}`} />
            ))}
        </div>
    </motion.div>
);

export default function GitCard({ data }: GitCardProps) {
    // use [slide, direction] tuple to track direction accurately
    const [[slide, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        let newSlide = slide + newDirection;
        if (newSlide > 3) newSlide = 0;
        if (newSlide < 0) newSlide = 3;
        setPage([newSlide, newDirection]);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            {/* 
                container needs explicit width/height and 'relative' 
                so the absolute children stay inside 
            */}
            <div className="relative w-80 h-96"> 
                <AnimatePresence initial={false} custom={direction}>
                    
                    {slide === 0 && (
                        <SlideWrapper 
                            key="intro" 
                            slide={slide} 
                            custom={direction} // pass direction to wrapper
                            title="The Profile" 
                            bgClass="bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <motion.img variants={contentVariants} src={data.profile.avatar_url} className="w-24 h-24 rounded-full border-4 border-white/50 shadow-lg" alt="Profile" />
                                <motion.div variants={contentVariants} className="text-center">
                                    <h1 className="text-3xl font-bold">{data.profile.name}</h1>
                                    <p className="opacity-75 font-mono">@{data.profile.login}</p>
                                </motion.div>
                                <motion.div variants={contentVariants} className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                                    Joined {new Date(data.profile.created_at).getFullYear()}
                                </motion.div>
                            </div>
                        </SlideWrapper>
                    )}

                    {slide === 1 && (
                        <SlideWrapper 
                            key="volume" 
                            slide={slide}
                            custom={direction}
                            title="The Grind" 
                            bgClass="bg-gradient-to-br from-orange-400 to-pink-600 text-white"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <motion.div variants={contentVariants} className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                    <GitCommit size={20} className="mb-1 opacity-75" />
                                    <div className="text-2xl font-bold">{data.profile.public_repos}</div>
                                    <div className="text-xs opacity-75">Public Repos</div>
                                </motion.div>
                                <motion.div variants={contentVariants} className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                                    <Star size={20} className="mb-1 opacity-75" />
                                    <div className="text-2xl font-bold">{data.totalStars}</div>
                                    <div className="text-xs opacity-75">Stars Earned</div>
                                </motion.div>
                                <motion.div variants={contentVariants} className="col-span-2 bg-white/20 p-4 rounded-xl backdrop-blur-sm flex items-center gap-3">
                                    <div className="text-4xl">🔥</div>
                                    <div>
                                        <div className="font-bold">Badge Unlocked</div>
                                        <div className="text-xs opacity-80">
                                            {data.profile.public_repos > 50 ? "Repo Hoarder" : "Clean Coder"}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </SlideWrapper>
                    )}

                    {slide === 2 && (
                        <SlideWrapper 
                            key="tech" 
                            slide={slide}
                            custom={direction}
                            title="The Tech" 
                            bgClass="bg-gradient-to-br from-emerald-400 to-cyan-600 text-white"
                        >
                            <div className="space-y-3">
                                {data.topLanguages.map((lang: any, index: number) => (
                                    <motion.div key={lang.lang} variants={contentVariants} className="relative">
                                        <div className="flex justify-between text-sm font-bold mb-1">
                                            <span>{lang.lang}</span>
                                            <span>{lang.count} repos</span>
                                        </div>
                                        <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-white opacity-90" 
                                                style={{ width: `${(lang.count / data.topLanguages[0].count) * 100}%` }} 
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </SlideWrapper>
                    )}

                    {slide === 3 && (
                        <SlideWrapper 
                            key="fame" 
                            slide={slide}
                            custom={direction}
                            title="Hall of Fame" 
                            bgClass="bg-gradient-to-br from-yellow-400 to-amber-600 text-white"
                        >
                            <div className="bg-white/20 p-5 rounded-xl backdrop-blur-sm border border-white/30">
                                <motion.div variants={contentVariants}><Trophy size={32} className="mb-3 text-yellow-200" /></motion.div>
                                <motion.h3 variants={contentVariants} className="text-xl font-bold truncate">{data.bestRepo.name}</motion.h3>
                                <motion.p variants={contentVariants} className="text-sm opacity-80 line-clamp-3 my-2">
                                    {data.bestRepo.description || "No description provided."}
                                </motion.p>
                                <motion.div variants={contentVariants} className="flex gap-4 mt-4 text-sm font-mono">
                                    <span className="flex items-center gap-1"><Star size={14} /> {data.bestRepo.stargazers_count}</span>
                                    <span className="flex items-center gap-1"><Code size={14} /> {data.bestRepo.language}</span>
                                </motion.div>
                            </div>
                        </SlideWrapper>
                    )}

                </AnimatePresence>
            </div>

            {/* CONTROLS */}
            <div className="flex gap-4">
                <button onClick={() => paginate(-1)} className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700">
                    <ChevronLeft />
                </button>
                <button onClick={() => paginate(1)} className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700">
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}