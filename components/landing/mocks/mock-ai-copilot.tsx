"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, MessageSquare } from "lucide-react"

export function MockAICopilot() {
    return (
        <div className="w-full h-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
            {/* AI Header */}
            <div className="h-14 bg-gradient-to-r from-indigo-950 to-slate-950 border-b border-indigo-500/20 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-500/20 p-1.5 rounded-lg">
                        <Brain className="h-4 w-4 text-indigo-400" />
                    </div>
                    <span className="text-indigo-100 text-sm font-bold tracking-wide">AI Co-Pilot</span>
                </div>
                <div className="flex items-center gap-1.5 bg-indigo-500/10 px-2 py-1 rounded-full border border-indigo-500/20">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-indigo-300 font-medium">Active</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 space-y-4 overflow-hidden relative">
                {/* User Message */}
                <div className="flex gap-3 justify-end">
                    <div className="bg-slate-800 text-slate-200 text-xs p-3 rounded-2xl rounded-tr-none max-w-[80%] border border-slate-700">
                        Patient mentions recurring insomnia and lack of focus during work hours.
                    </div>
                </div>

                {/* AI Thinking */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="space-y-2 max-w-[85%]">
                        <motion.div
                            className="bg-indigo-950/50 text-indigo-100 text-xs p-3 rounded-2xl rounded-tl-none border border-indigo-500/30 backdrop-blur-sm"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <p className="font-semibold mb-2 text-indigo-300">Analysis:</p>
                            <ul className="space-y-1 list-disc pl-4 opacity-90">
                                <li>Symptoms suggest potential Generalized Anxiety Disorder (GAD).</li>
                                <li>Consider administering GAD-7 scale.</li>
                                <li>Review sleep hygiene protocols.</li>
                            </ul>
                        </motion.div>

                        {/* Suggestion Chip */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            className="flex gap-2"
                        >
                            <button className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 text-[10px] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
                                <MessageSquare className="h-3 w-3" />
                                Add to Report
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
