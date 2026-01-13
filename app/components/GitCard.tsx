import React, { useState, useRef } from "react";
import { ChevronRight, ChevronLeft, Github, Star, GitCommit, Code, Trophy, Download, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";

// NOTE: 'any' type used for brevity; replace with proper types as needed
// and Github Icon from 'lucide-react' is depracated

interface GitCardProps {
    data: any;
}

// ---------------------------------------------------------
// 1. HELPERS & STYLES
// ---------------------------------------------------------

const gradients = [
    "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)", // 0: Profile
    "linear-gradient(135deg, #fb923c 0%, #db2777 100%)", // 1: Grind
    "linear-gradient(135deg, #34d399 0%, #0891b2 100%)", // 2: Tech
    "linear-gradient(135deg, #facc15 0%, #d97706 100%)", // 3: Fame
];

const glassStyle = { backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' };

const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 320 : -320, opacity: 0, scale: 0.9, zIndex: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1, transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 320 : -320, opacity: 0, scale: 0.9, transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } }),
};

const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } },
};

// ---------------------------------------------------------
// 2. THE CONTENT RENDERER
// ---------------------------------------------------------
const CardContent = ({ slide, data }: { slide: number, data: any }) => {
    return (
        <>
            {/* HEADER */}
            <div className="flex justify-between items-center opacity-80 mb-4">
                <span className="text-xs font-mono uppercase tracking-widest">GitCard 2025</span>
                <Github size={16} />
            </div>

            {/* TITLES */}
            <h2 className="text-2xl font-black uppercase mb-4 text-center tracking-tighter">
                {slide === 0 && "The Profile"}
                {slide === 1 && "The Grind"}
                {slide === 2 && "The Tech"}
                {slide === 3 && "The Fame"}
            </h2>

            {/* BODY CONTENT */}
            <div className="flex-1 flex flex-col justify-center">
                
                {/* SLIDE 0: PROFILE */}
                {slide === 0 && (
                    <div className="flex flex-col items-center gap-4">
                        <img 
                            src={`${data.profile.avatar_url}?v=${new Date().getTime()}`} 
                            crossOrigin="anonymous"
                            className="w-24 h-24 rounded-full border-4 shadow-lg"
                            style={{ borderColor: 'rgba(255,255,255,0.5)' }} 
                        />
                        <div className="text-center">
                            <h1 className="text-3xl font-bold">{data.profile.name}</h1>
                            <p className="opacity-75 font-mono">@{data.profile.login}</p>
                        </div>
                        <div className="px-4 py-1 rounded-full text-sm font-bold" style={glassStyle}>
                            Joined {new Date(data.profile.created_at).getFullYear()}
                        </div>
                    </div>
                )}

                {/* SLIDE 1: GRIND */}
                {slide === 1 && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl" style={glassStyle}>
                            <GitCommit size={20} className="mb-1 opacity-75" />
                            <div className="text-2xl font-bold">{data.profile.public_repos}</div>
                            <div className="text-xs opacity-75">Public Repos</div>
                        </div>
                        <div className="p-3 rounded-xl" style={glassStyle}>
                            <Star size={20} className="mb-1 opacity-75" />
                            <div className="text-2xl font-bold">{data.totalStars}</div>
                            <div className="text-xs opacity-75">Stars Earned</div>
                        </div>
                        <div className="col-span-2 p-4 rounded-xl flex items-center gap-3" style={glassStyle}>
                            <div className="text-4xl">🔥</div>
                            <div>
                                <div className="font-bold">Badge Unlocked</div>
                                <div className="text-xs opacity-80">
                                    {data.profile.public_repos > 50 ? "Repo Hoarder" : "Clean Coder"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SLIDE 2: TECH */}
                {slide === 2 && (
                    <div className="space-y-3">
                        {data.topLanguages.map((lang: any) => (
                            <div key={lang.lang} className="relative">
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span>{lang.lang}</span>
                                    <span>{lang.count} repos</span>
                                </div>
                                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                    <div className="h-full bg-white opacity-90" style={{ width: `${(lang.count / data.topLanguages[0].count) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* SLIDE 3: FAME */}
                {slide === 3 && (
                    <div className="p-5 rounded-xl border" style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)' }}>
                        {/* Removed 'text-yellow-200' and used explicit hex color */}
                        <Trophy size={32} className="mb-3" color="#fde047" /> 
                        <h3 className="text-xl font-bold truncate">{data.bestRepo.name}</h3>
                        <p className="text-sm opacity-80 line-clamp-3 my-2">{data.bestRepo.description || "No description provided."}</p>
                        <div className="flex gap-4 mt-4 text-sm font-mono">
                            <span className="flex items-center gap-1"><Star size={14} /> {data.bestRepo.stargazers_count}</span>
                            <span className="flex items-center gap-1"><Code size={14} /> {data.bestRepo.language}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* FOOTER DOTS */}
            <div className="flex justify-center gap-1 mt-4">
                {[0, 1, 2, 3].map((i) => (
                    <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all ${i === slide ? "w-8" : "w-2"}`}
                        style={{ backgroundColor: i === slide ? '#ffffff' : 'rgba(255,255,255,0.3)' }}
                    />
                ))}
            </div>
        </>
    );
};

// ---------------------------------------------------------
// 3. MAIN COMPONENT
// ---------------------------------------------------------
export default function GitCard({ data }: GitCardProps) {
    const [[slide, direction], setPage] = useState([0, 0]);
    const [isDownloading, setIsDownloading] = useState(false);
    const exportRef = useRef<HTMLDivElement>(null);

    const paginate = (newDirection: number) => {
        let newSlide = slide + newDirection;
        if (newSlide > 3) newSlide = 0;
        if (newSlide < 0) newSlide = 3;
        setPage([newSlide, newDirection]);
    };

    const handleDownload = async () => {
        if (!exportRef.current || isDownloading) return;
        setIsDownloading(true);

        setTimeout(async () => {
            try {
                const canvas = await html2canvas(exportRef.current!, {
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    scale: 2, 
                });

                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = `gitcard-${data.profile.login}-${slide}.png`;
                link.click();
            } catch (err) {
                console.error("Download failed", err);
                alert("Download failed. Try Firefox or Chrome.");
            } finally {
                setTimeout(() => setIsDownloading(false), 500);
            }
        }, 100);
    };

    return (
        <div className="flex flex-col items-center gap-6">
            
            {/* ANIMATED CARD */}
            <div className="relative w-80 h-96"> 
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={slide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute top-0 left-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-2xl text-white"
                        // Explicitly defined white border to avoid 'lab' colors
                        style={{ background: gradients[slide], border: "4px solid #ffffff" }}
                    >
                         <motion.div 
                             className="flex-1 flex flex-col h-full"
                             initial="hidden" 
                             animate="visible" 
                             variants={contentVariants} 
                             transition={{ staggerChildren: 0.1 }}
                         >
                                <CardContent slide={slide} data={data} />
                         </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* HIDDEN EXPORT CARD */}
            <div 
                ref={exportRef}
                style={{ 
                    position: "fixed", 
                    top: 0, 
                    left: "-9999px",
                    width: "320px",
                    height: "384px",
                    background: gradients[slide],
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    border: "4px solid #ffffff", // hex white
                    color: "#ffffff", // hex white
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                 <CardContent slide={slide} data={data} />
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-4">
                <button onClick={() => paginate(-1)} className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 hover:scale-110 transition active:scale-90">
                    <ChevronLeft />
                </button>
                
                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`flex items-center gap-2 px-6 py-3 font-bold rounded-full transition shadow-lg active:scale-95 ${
                        isDownloading 
                            ? "bg-gray-500 cursor-wait text-gray-200" 
                            : "bg-white text-black hover:bg-gray-200"
                    }`}
                >
                    {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    <span>{isDownloading ? "Saving..." : "Save Slide"}</span>
                </button>

                <button onClick={() => paginate(1)} className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 hover:scale-110 transition active:scale-90">
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}