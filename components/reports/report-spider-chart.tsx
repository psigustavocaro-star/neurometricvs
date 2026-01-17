"use client"

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from "recharts"

interface SpiderChartProps {
    data: {
        subject: string
        A: number
        fullMark: number
    }[]
    title?: string
}

export function ReportSpiderChart({ data, title }: SpiderChartProps) {
    return (
        <div className="w-full h-[350px] flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            {title && <h4 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">{title}</h4>}
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#64748b", fontSize: 10, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 'auto']}
                        tick={{ fill: "#94a3b8", fontSize: 8 }}
                    />
                    <Radar
                        name="Puntuación"
                        dataKey="A"
                        stroke="#0f172a"
                        fill="#3b82f6"
                        fillOpacity={0.5}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontSize: '12px'
                        }}
                    />
                </RadarChart>
            </ResponsiveContainer>
            <div className="mt-2 text-[10px] text-slate-400 italic">
                Gráfico de perfil neuropsicológico estandarizado
            </div>
        </div>
    )
}
