'use client'

import React from 'react'

interface GenogramLegendProps {
    compact?: boolean
}

export function GenogramLegend({ compact = false }: GenogramLegendProps) {
    const symbolSize = compact ? 16 : 24
    const lineLength = compact ? 40 : 60

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 ${compact ? 'p-2' : 'p-4'}`}>
            <h4 className={`font-semibold text-slate-700 dark:text-slate-200 ${compact ? 'text-xs mb-2' : 'text-sm mb-3'}`}>
                Leyenda del Genograma
            </h4>

            <div className={`grid ${compact ? 'grid-cols-2 gap-2' : 'grid-cols-1 gap-4'}`}>
                {/* Symbols Section */}
                <div>
                    <p className={`font-medium text-slate-600 dark:text-slate-300 ${compact ? 'text-[10px] mb-1' : 'text-xs mb-2'}`}>
                        Símbolos
                    </p>
                    <div className={`space-y-${compact ? '1' : '2'}`}>
                        {/* Male */}
                        <div className="flex items-center gap-2">
                            <svg width={symbolSize} height={symbolSize} viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" fill="white" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Hombre</span>
                        </div>
                        {/* Female */}
                        <div className="flex items-center gap-2">
                            <svg width={symbolSize} height={symbolSize} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill="white" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Mujer</span>
                        </div>
                        {/* Deceased */}
                        <div className="flex items-center gap-2">
                            <svg width={symbolSize} height={symbolSize} viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" fill="white" stroke="#334155" strokeWidth="2" />
                                <line x1="2" y1="2" x2="22" y2="22" stroke="#334155" strokeWidth="2" />
                                <line x1="22" y1="2" x2="2" y2="22" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Fallecido/a</span>
                        </div>
                        {/* Patient/Identified */}
                        <div className="flex items-center gap-2">
                            <svg width={symbolSize} height={symbolSize} viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" fill="#0d9488" stroke="#0d9488" strokeWidth="3" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Paciente</span>
                        </div>
                    </div>
                </div>

                {/* Relationship Lines Section */}
                <div>
                    <p className={`font-medium text-slate-600 dark:text-slate-300 ${compact ? 'text-[10px] mb-1' : 'text-xs mb-2'}`}>
                        Relaciones
                    </p>
                    <div className={`space-y-${compact ? '1' : '2'}`}>
                        {/* Marriage */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="16" viewBox={`0 0 ${lineLength} 16`}>
                                <line x1="0" y1="7" x2={lineLength} y2="7" stroke="#334155" strokeWidth="2" />
                                <line x1="0" y1="9" x2={lineLength} y2="9" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Matrimonio</span>
                        </div>
                        {/* Cohabitation */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="16" viewBox={`0 0 ${lineLength} 16`}>
                                <line x1="0" y1="8" x2={lineLength} y2="8" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Pareja/Convivencia</span>
                        </div>
                        {/* Separation */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="16" viewBox={`0 0 ${lineLength} 16`}>
                                <line x1="0" y1="8" x2={lineLength * 0.4} y2="8" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength * 0.35} y1="3" x2={lineLength * 0.5} y2="13" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength * 0.5} y1="8" x2={lineLength} y2="8" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Separación</span>
                        </div>
                        {/* Divorce */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="16" viewBox={`0 0 ${lineLength} 16`}>
                                <line x1="0" y1="8" x2={lineLength * 0.35} y2="8" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength * 0.35} y1="3" x2={lineLength * 0.45} y2="13" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength * 0.45} y1="3" x2={lineLength * 0.55} y2="13" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength * 0.55} y1="8" x2={lineLength} y2="8" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Divorcio</span>
                        </div>
                    </div>
                </div>

                {/* Emotional Relationships Section */}
                <div className={compact ? '' : 'col-span-1'}>
                    <p className={`font-medium text-slate-600 dark:text-slate-300 ${compact ? 'text-[10px] mb-1' : 'text-xs mb-2'}`}>
                        Relaciones Emocionales
                    </p>
                    <div className={`space-y-${compact ? '1' : '2'}`}>
                        {/* Close */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="16" viewBox={`0 0 ${lineLength} 16`}>
                                <line x1="0" y1="6" x2={lineLength} y2="6" stroke="#16a34a" strokeWidth="2" />
                                <line x1="0" y1="10" x2={lineLength} y2="10" stroke="#16a34a" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Cercana/Fuerte</span>
                        </div>
                        {/* Conflict */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="16" viewBox={`0 0 ${lineLength} 16`}>
                                <polyline
                                    points={`0,8 ${lineLength * 0.15},4 ${lineLength * 0.3},12 ${lineLength * 0.45},4 ${lineLength * 0.6},12 ${lineLength * 0.75},4 ${lineLength * 0.9},12 ${lineLength},8`}
                                    fill="none"
                                    stroke="#dc2626"
                                    strokeWidth="2"
                                />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Conflicto/Hostil</span>
                        </div>
                        {/* Distant */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="16" viewBox={`0 0 ${lineLength} 16`}>
                                <line x1="0" y1="8" x2={lineLength} y2="8" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Distante</span>
                        </div>
                        {/* Cutoff */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="16" viewBox={`0 0 ${lineLength} 16`}>
                                <line x1="0" y1="8" x2={lineLength * 0.4} y2="8" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength * 0.4} y1="4" x2={lineLength * 0.4} y2="12" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength * 0.5} y1="4" x2={lineLength * 0.5} y2="12" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength * 0.5} y1="8" x2={lineLength} y2="8" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Sin contacto</span>
                        </div>
                    </div>
                </div>

                {/* Family Structure */}
                <div>
                    <p className={`font-medium text-slate-600 dark:text-slate-300 ${compact ? 'text-[10px] mb-1' : 'text-xs mb-2'}`}>
                        Estructura
                    </p>
                    <div className={`space-y-${compact ? '1' : '2'}`}>
                        {/* Parent-Child */}
                        <div className="flex items-center gap-2">
                            <svg width={symbolSize} height={symbolSize} viewBox="0 0 24 24">
                                <line x1="12" y1="0" x2="12" y2="24" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Padre-Hijo</span>
                        </div>
                        {/* Sibling connection */}
                        <div className="flex items-center gap-2">
                            <svg width={lineLength} height="20" viewBox={`0 0 ${lineLength} 20`}>
                                <line x1="8" y1="0" x2="8" y2="10" stroke="#334155" strokeWidth="2" />
                                <line x1="8" y1="10" x2={lineLength - 8} y2="10" stroke="#334155" strokeWidth="2" />
                                <line x1={lineLength - 8} y1="0" x2={lineLength - 8} y2="10" stroke="#334155" strokeWidth="2" />
                            </svg>
                            <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>Hermanos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
