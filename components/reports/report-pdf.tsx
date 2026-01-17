import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 50,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 30,
        borderBottomWidth: 1.5,
        borderBottomColor: '#1E293B',
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLogo: {
        width: 40,
        height: 40,
        backgroundColor: '#1E293B',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F172A',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    subtitle: {
        fontSize: 9,
        color: '#64748B',
        textTransform: 'uppercase',
        marginTop: 2,
    },
    professionalInfo: {
        textAlign: 'right',
    },
    professionalName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0F172A',
    },
    professionalDetail: {
        fontSize: 8,
        color: '#64748B',
        marginTop: 1,
    },
    reportingSection: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1E293B',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 5,
        marginBottom: 12,
        backgroundColor: '#F8FAFC',
        paddingLeft: 8,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    infoItem: {
        width: '50%',
        marginBottom: 6,
    },
    label: {
        fontSize: 9,
        color: '#64748B',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    value: {
        fontSize: 10,
        color: '#1E293B',
    },
    apaCitation: {
        fontSize: 8,
        color: '#64748B',
        fontStyle: 'italic',
        marginTop: 5,
        borderLeftWidth: 2,
        borderLeftColor: '#CBD5E1',
        paddingLeft: 8,
    },
    table: {
        display: 'flex',
        width: 'auto',
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: '#E2E8F0',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E2E8F0',
        minHeight: 25,
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: '#F1F5F9',
    },
    tableCol: {
        padding: 6,
    },
    tableCellHeader: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#475569',
        textTransform: 'uppercase',
    },
    tableCell: {
        fontSize: 9,
        color: '#1E293B',
    },
    severityBadge: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 2,
        fontSize: 7,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 100,
    },
    resultsSummaryBox: {
        backgroundColor: '#F8FAFC',
        padding: 15,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    bigScore: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0F172A',
        textAlign: 'center',
    },
    scoreLabel: {
        fontSize: 8,
        color: '#64748B',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    interpretationText: {
        fontSize: 10,
        lineHeight: 1.7,
        color: '#334155',
        textAlign: 'justify',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 30,
        left: 50,
        right: 50,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 10,
    },
    footerText: {
        fontSize: 7,
        color: '#94A3B8',
        textAlign: 'center',
    },
    signatureContainer: {
        marginTop: 60,
        alignItems: 'center',
    },
    signatureLine: {
        width: 180,
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
        marginTop: 40,
        marginBottom: 5,
    },
    signatureName: {
        fontSize: 10,
        fontWeight: 'bold',
    }
});

// To be imported correctly in the original file
export const ReportPDF = ({ patient, profile, result, interpretation }: any) => {
    const testDate = new Date(result.created_at)
    const formattedDate = format(testDate, "d 'de' MMMM 'de' yyyy", { locale: es })

    const getSeverityColor = (label: string = '') => {
        const l = label.toLowerCase();
        if (l.includes('normal') || l.includes('bajo') || l.includes('sin indicadores')) return '#16a34a'; // Green
        if (l.includes('moderado') || l.includes('yellow') || l.includes('media')) return '#ca8a04'; // Yellow
        return '#dc2626'; // Red
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.headerLogo}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>NM</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>NeuroMetrics LATAM</Text>
                            <Text style={styles.subtitle}>Unidad de Evaluación Neuropsicológica</Text>
                        </View>
                    </View>
                    <View style={styles.professionalInfo}>
                        <Text style={styles.professionalName}>{profile.full_name || 'Especialista a Cargo'}</Text>
                        <Text style={styles.professionalDetail}>{profile.specialty || 'Psicología / Neuropsicología'}</Text>
                        {profile.registry_number && <Text style={styles.professionalDetail}>Registro Profesional: {profile.registry_number}</Text>}
                    </View>
                </View>

                <View style={styles.reportingSection}>
                    <Text style={styles.sectionTitle}>I. Identificación del Evaluado</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>Nombre Completo:</Text>
                            <Text style={styles.value}>{patient.full_name}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>ID Clínico:</Text>
                            <Text style={styles.value}>{patient.id_clinico || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>Fecha de Evaluación:</Text>
                            <Text style={styles.value}>{formattedDate}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>Instrumento Clínico:</Text>
                            <Text style={[styles.value, { fontWeight: 'bold' }]}>{result?.test_id?.toUpperCase()}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.reportingSection}>
                    <Text style={styles.sectionTitle}>II. Referencia Técnica</Text>
                    <Text style={[styles.interpretationText, { fontStyle: 'italic', marginBottom: 5 }]}>
                        Evaluación realizada bajo protocolos estandarizados de NeuroMetrics. Los resultados presentados a continuación se basan en baremos poblacionales validados.
                    </Text>
                </View>

                <View style={styles.reportingSection}>
                    <Text style={styles.sectionTitle}>III. Resumen de Puntuaciones</Text>
                    <View style={styles.resultsSummaryBox}>
                        <View>
                            <Text style={styles.scoreLabel}>Puntuación Directa</Text>
                            <Text style={styles.bigScore}>{result.results_json?.score}</Text>
                        </View>
                        <View>
                            <Text style={styles.scoreLabel}>Clasificación Clínica</Text>
                            <Text style={[styles.value, { fontSize: 14, fontWeight: 'bold', color: getSeverityColor(result.results_json?.label) }]}>
                                {result.results_json?.label}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <View style={[styles.tableCol, { width: '45%' }]}><Text style={styles.tableCellHeader}>Escala / Dimensión Evaluada</Text></View>
                            <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableCellHeader}>Puntaje</Text></View>
                            <View style={[styles.tableCol, { width: '30%' }]}><Text style={styles.tableCellHeader}>Indicador Clínico</Text></View>
                        </View>

                        {Array.isArray(result.results_json?.details) ? (
                            result.results_json.details.map((detail: any, index: number) => (
                                <View key={index} style={styles.tableRow}>
                                    <View style={[styles.tableCol, { width: '45%' }]}><Text style={styles.tableCell}>{detail.title}</Text></View>
                                    <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableCell}>{detail.score}</Text></View>
                                    <View style={[styles.tableCol, { width: '30%' }]}>
                                        <Text style={[styles.severityBadge, { color: getSeverityColor(detail.label), backgroundColor: getSeverityColor(detail.label) + '15' }]}>
                                            {detail.label}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={styles.tableRow}>
                                <View style={[styles.tableCol, { width: '45%' }]}><Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Puntuación Total</Text></View>
                                <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableCell}>{result.results_json?.score}</Text></View>
                                <View style={[styles.tableCol, { width: '30%' }]}>
                                    <Text style={[styles.severityBadge, { color: getSeverityColor(result.results_json?.label), backgroundColor: getSeverityColor(result.results_json?.label) + '15' }]}>
                                        {result.results_json?.label}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.reportingSection}>
                    <Text style={styles.sectionTitle}>IV. Interpretación y Conclusión Clínica</Text>
                    <Text style={styles.interpretationText}>
                        {interpretation}
                    </Text>
                </View>

                <View style={styles.signatureContainer}>
                    <View style={styles.signatureLine} />
                    <Text style={styles.signatureName}>{profile.full_name || 'Firma del Profesional'}</Text>
                    <Text style={styles.professionalDetail}>{profile.specialty || 'Especialista en Salud Mental'}</Text>
                    {profile.registry_number && <Text style={styles.professionalDetail}>Cód. Reg. {profile.registry_number}</Text>}
                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Informe generado por el sistema NeuroMetrics. Este documento es propiedad del sistema de salud y de carácter confidencial bajo normas de protección de datos clínicos.
                    </Text>
                    <Text style={[styles.footerText, { marginTop: 4 }]}>
                        Código de Verificación Electrónica: {result.id?.substring(0, 8).toUpperCase()}
                    </Text>
                </View>
            </Page>
        </Document>
    )
}
