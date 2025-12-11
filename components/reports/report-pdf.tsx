import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

// Register a nice font (optional, using standard Helvetica for now for speed/reliability)
// Font.register({ family: 'Open Sans', src: '...' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerLeft: {
        flexDirection: 'column',
    },
    headerRight: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 10,
        color: '#64748B',
        marginTop: 4,
    },
    professionalName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0F172A',
    },
    professionalDetail: {
        fontSize: 9,
        color: '#64748B',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#94A3B8', // Slate-400
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        paddingBottom: 4,
        marginBottom: 8,
        letterSpacing: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    label: {
        width: '30%',
        fontSize: 10,
        color: '#475569',
        fontWeight: 'bold',
    },
    value: {
        width: '70%',
        fontSize: 10,
        color: '#1E293B',
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 4,
        marginTop: 10,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        minHeight: 24,
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: '#F8FAFC',
    },
    tableCol: {
        width: '25%',
        padding: 5,
    },
    tableCellHeader: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#475569',
    },
    tableCell: {
        fontSize: 9,
        color: '#334155',
    },
    badge: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        fontSize: 8,
        textAlign: 'center',
    },
    badgeGreen: {
        backgroundColor: '#DCFCE7',
        color: '#166534',
    },
    badgeRed: {
        backgroundColor: '#FEE2E2',
        color: '#991B1B',
    },
    textBlock: {
        fontSize: 10,
        lineHeight: 1.6,
        color: '#334155',
        textAlign: 'justify',
    },
    signatureBlock: {
        marginTop: 50,
        alignItems: 'center',
        width: '100%',
    },
    signatureContainer: {
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#0F172A',
        paddingTop: 10,
        width: 250, // Fixed width for the line
    },
    signatureName: {
        fontSize: 11, // Smaller than header
        fontWeight: 'bold',
        color: '#0F172A',
        textAlign: 'center',
    },
    signatureDetail: {
        fontSize: 9,
        color: '#334155',
        textAlign: 'center',
        marginTop: 2,
    },
    signatureCustom: {
        fontSize: 8,
        color: '#334155',
        textAlign: 'center',
        marginTop: 4,
        maxWidth: 300,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 8,
        color: '#94A3B8',
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        paddingTop: 10,
    },
    // Chart Styles
    chartContainer: {
        marginTop: 10,
        marginBottom: 20,
        height: 150,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 5,
    },
    barContainer: {
        alignItems: 'center',
        width: 60,
    },
    bar: {
        width: 30,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    barLabel: {
        fontSize: 8,
        color: '#64748B',
        marginTop: 4,
        textAlign: 'center',
    },
    barValue: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#334155',
        marginBottom: 2,
    }
});

interface ReportPDFProps {
    patient: any;
    profile: any;
    result: any;
    interpretation: string;
    chartData?: any[];
}

export const ReportPDF = ({ patient, profile, result, interpretation, chartData }: ReportPDFProps) => {
    const testDate = new Date(result.created_at)
    const formattedDate = format(testDate, "d 'de' MMMM 'de' yyyy", { locale: es })
    const scores = result.results_json?.scores || {}

    // Helper for badges
    const getBadgeStyle = (label: string) => {
        if (label === 'Sin Indicadores Clínicos' || label === 'Normal') return styles.badgeGreen
        return styles.badgeRed
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.title}>Informe Clínico</Text>
                        <Text style={styles.subtitle}>Confidencial</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.professionalName}>{profile.full_name || 'Profesional Tratante'}</Text>
                        <Text style={styles.professionalDetail}>{profile.specialty || 'Psicología Clínica / Neuropsicología'}</Text>
                        {profile.registry_number && <Text style={styles.professionalDetail}>Reg: {profile.registry_number}</Text>}
                    </View>
                </View>

                {/* Patient Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Identificación del Paciente</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.value}>{patient.full_name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha de Nacimiento:</Text>
                        <Text style={styles.value}>{patient.birth_date}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha de Evaluación:</Text>
                        <Text style={styles.value}>{formattedDate}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Instrumento:</Text>
                        <Text style={styles.value}>{result?.test_id?.toUpperCase() || 'N/A'}</Text>
                    </View>
                </View>

                {/* Quantitative Results */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resultados Cuantitativos</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.tableCellHeader}>Escala / Subescala</Text></View>
                            <View style={[styles.tableCol, { width: '20%' }]}><Text style={styles.tableCellHeader}>Puntaje</Text></View>
                            <View style={[styles.tableCol, { width: '30%' }]}><Text style={styles.tableCellHeader}>Interpretación</Text></View>
                        </View>

                        {Array.isArray(result.results_json?.details) ? (
                            result.results_json.details.map((detail: any, index: number) => (
                                <View key={index} style={styles.tableRow}>
                                    <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.tableCell}>{detail.title}</Text></View>
                                    <View style={[styles.tableCol, { width: '20%' }]}><Text style={styles.tableCell}>{typeof detail.score === 'number' ? detail.score.toFixed(2) : detail.score}</Text></View>
                                    <View style={[styles.tableCol, { width: '30%' }]}>
                                        <Text style={[styles.badge, getBadgeStyle(detail.label)]}>
                                            {detail.label === 'Normal' ? 'Sin Indicadores Clínicos' : detail.label}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                                <View style={[styles.tableCol, { width: '50%' }]}><Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Puntuación Total</Text></View>
                                <View style={[styles.tableCol, { width: '20%' }]}><Text style={[styles.tableCell, { fontWeight: 'bold' }]}>{result.results_json?.score}</Text></View>
                                <View style={[styles.tableCol, { width: '30%' }]}>
                                    <Text style={[styles.badge, getBadgeStyle(result.results_json?.label)]}>
                                        {result.results_json?.label === 'Normal' ? 'Sin Indicadores Clínicos' : result.results_json?.label}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                {/* Chart Section */}
                {chartData && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Gráfico de Resultados</Text>
                        <View style={styles.chartContainer}>
                            {chartData.map((data, index) => {
                                // Simple scaling: Max score usually 3 for SNAP-IV. 
                                // Height = (score / 3) * 100% of container height (120px approx)
                                const height = Math.min((data.score / 3) * 120, 120);
                                return (
                                    <View key={index} style={styles.barContainer}>
                                        <Text style={styles.barValue}>{data.score.toFixed(2)}</Text>
                                        <View style={[styles.bar, { height: height, backgroundColor: data.color }]} />
                                        <Text style={styles.barLabel}>{data.name}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                )}

                {/* Interpretation */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Interpretación Clínica</Text>
                    <Text style={styles.textBlock}>
                        {interpretation}
                    </Text>
                </View>

                {/* Signature */}
                <View style={styles.signatureBlock}>
                    <View style={styles.signatureContainer}>
                        <Text style={styles.signatureName}>{profile.full_name}</Text>
                        <Text style={styles.signatureDetail}>{profile.specialty || 'Psicólogo Clínico'}</Text>
                        {profile.registry_number && <Text style={styles.signatureDetail}>Nº Registro {profile.registry_number}</Text>}
                        {profile.email && <Text style={styles.signatureDetail}>Correo: {profile.email}</Text>}
                        {profile.signature_url && (
                            <Text style={styles.signatureCustom}>
                                {profile.signature_url}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Este documento es un informe clínico confidencial generado por Neurometrics.
                    La interpretación de estos resultados debe ser realizada por un profesional calificado.
                </Text>
            </Page>
        </Document>
    )
}
