'use client';

import { useState, useEffect } from 'react';
import { getPaddle } from '@/lib/paddle-client';
import { PADDLE_ENV, PRICE_ID_BASIC, PRICE_ID_CLINICAL, PRICE_ID_PRO } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function DebugPaddlePage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [log, setLog] = useState<string[]>([]);
    const [prices, setPrices] = useState<any>({});

    const addLog = (msg: string) => setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

    const runDiagnostics = async () => {
        setStatus('loading');
        setLog([]);
        setPrices({});
        addLog(`Starting diagnostics in ${PADDLE_ENV} environment...`);

        try {
            const paddle = await getPaddle();
            if (!paddle) {
                addLog('❌ Failed to initialize Paddle SDK');
                setStatus('error');
                return;
            }
            addLog('✅ Paddle SDK initialized successfully');

            const priceIds = [
                { name: 'Basic', id: PRICE_ID_BASIC },
                { name: 'Clinical', id: PRICE_ID_CLINICAL },
                { name: 'Pro', id: PRICE_ID_PRO }
            ];

            for (const item of priceIds) {
                if (!item.id) {
                    addLog(`⚠️ Skipping ${item.name}: ID is missing in environment variables`);
                    continue;
                }

                addLog(`Fetching price for ${item.name} (${item.id})...`);
                try {
                    const priceData = await paddle.PricePreview({
                        items: [{ priceId: item.id.trim(), quantity: 1 }]
                    });
                    addLog(`✅ ${item.name} fetch success: ${priceData.data.details.lineItems[0].totals.total} ${priceData.data.currencyCode}`);
                    setPrices((prev: any) => ({ ...prev, [item.name]: priceData.data }));
                } catch (e: any) {
                    addLog(`❌ ${item.name} fetch failed: ${e.message || 'Unknown error'}`);
                    console.error(`Error fetching ${item.name}:`, e);
                }
            }

            setStatus('success');
            addLog('Diagnostics complete.');
        } catch (err: any) {
            addLog(`❌ Global error during diagnostics: ${err.message}`);
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl space-y-6 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Paddle Diagnostics Tool</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-500" /> Environment Config
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm font-mono bg-white p-4 rounded-lg border">
                        <p><span className="text-slate-500">PADDLE_ENV:</span> {PADDLE_ENV}</p>
                        <p><span className="text-slate-500">ID BASIC:</span> {PRICE_ID_BASIC || 'MISSING'}</p>
                        <p><span className="text-slate-500">ID CLINICAL:</span> {PRICE_ID_CLINICAL || 'MISSING'}</p>
                        <p><span className="text-slate-500">ID PRO:</span> {PRICE_ID_PRO || 'MISSING'}</p>
                    </CardContent>
                </Card>

                <Card className="flex flex-col justify-center items-center p-6 space-y-4">
                    <Button
                        size="lg"
                        onClick={runDiagnostics}
                        disabled={status === 'loading'}
                        className="w-full bg-teal-600 hover:bg-teal-700 h-14 text-lg"
                    >
                        {status === 'loading' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Run Live Diagnostics'}
                    </Button>
                    <p className="text-xs text-slate-500 text-center uppercase tracking-widest font-bold">
                        Targeting {PADDLE_ENV} environment
                    </p>
                </Card>
            </div>

            <Card className="overflow-hidden">
                <CardHeader className="bg-slate-900 text-white">
                    <CardTitle className="text-sm uppercase tracking-widest font-bold">Diagnostic Log</CardTitle>
                </CardHeader>
                <CardContent className="bg-slate-950 text-teal-400 p-6 font-mono text-xs h-64 overflow-y-auto">
                    {log.length === 0 ? '> Ready to run diagnostics...' : log.map((line, i) => (
                        <div key={i} className="mb-1 leading-relaxed">
                            <span className="text-teal-900 mr-2">[{i + 1}]</span> {line}
                        </div>
                    ))}
                    {status === 'loading' && <div className="animate-pulse">_ Running...</div>}
                </CardContent>
            </Card>

            {status === 'success' && (
                <div className="bg-teal-50 border border-teal-200 p-6 rounded-xl flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 text-teal-600 shrink-0" />
                    <div>
                        <h3 className="font-bold text-teal-900 text-lg">Diagnostics Completed Successfully</h3>
                        <p className="text-teal-800 opacity-80">If all prices show a checkmark, the checkout overlay should open correctly in the onboarding flow.</p>
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl flex items-start gap-4">
                    <XCircle className="w-8 h-8 text-red-600 shrink-0" />
                    <div>
                        <h3 className="font-bold text-red-900 text-lg">Diagnostics Failed</h3>
                        <p className="text-red-800 opacity-80">Check the log above to identify which step failed. Common issues include invalid tokens or incorrect Price IDs for the current environment.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
