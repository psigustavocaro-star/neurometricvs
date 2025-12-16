"use client"

import { motion } from "framer-motion"
import { Calendar, Bell, ChevronRight } from "lucide-react"

export function MockPatientPortal() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            {/* Mobile Frame */}
            <div className="w-[200px] h-[350px] bg-slate-950 rounded-[2rem] border-4 border-slate-800 shadow-2xl overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-xl z-20" />

                {/* App Header */}
                <div className="h-16 bg-teal-600 pt-6 px-4 flex justify-between items-center z-10 relative">
                    <span className="text-white font-bold text-xs">Neurometrics</span>
                    <div className="w-6 h-6 bg-teal-700/50 rounded-full flex items-center justify-center">
                        <Bell className="h-3 w-3 text-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 bg-slate-50 h-full">
                    {/* Welcome */}
                    <div className="space-y-1">
                        <div className="h-2 w-16 bg-slate-200 rounded" />
                        <div className="h-4 w-32 bg-slate-300 rounded" />
                    </div>

                    {/* Next Appointment Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-teal-50 p-1.5 rounded-md">
                                <Calendar className="h-3 w-3 text-teal-600" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-700">Next Session</span>
                        </div>
                        <div className="text-xs font-medium text-slate-900">Tomorrow, 15:00</div>
                        <div className="text-[10px] text-slate-500">Dr. Ricardo Silva</div>
                    </motion.div>

                    {/* Task */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 flex justify-between items-center"
                    >
                        <div>
                            <div className="text-[10px] font-bold text-indigo-900">Pending Task</div>
                            <div className="text-[10px] text-indigo-600">Complete Anxiety Scale</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-indigo-400" />
                    </motion.div>

                    {/* Notification pop */}
                    <motion.div
                        className="absolute bottom-6 left-4 right-4 bg-slate-900 text-white p-3 rounded-lg shadow-xl z-20 flex items-center gap-2"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 2, type: "spring" }}
                    >
                        <div className="w-2 h-2 rounded-full bg-teal-400" />
                        <span className="text-[10px]">New assessment assigned</span>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
