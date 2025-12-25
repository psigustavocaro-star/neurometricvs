"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const ClinicalMarkdown = ({ content }) => {
    return (
        <div className="prose prose-slate max-w-none prose-headings:text-indigo-900 prose-p:text-slate-700 prose-li:text-slate-700">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-bold text-indigo-900 mb-4 border-b border-indigo-100 pb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-semibold text-indigo-800 mt-6 mb-3 flex items-center gap-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-medium text-slate-800 mt-4 mb-2" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className="font-semibold text-slate-900" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 space-y-1 my-2" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 my-4 rounded-r-lg italic text-indigo-900">
                            {props.children}
                        </div>
                    ),
                    // Custom handling for specific patterns if the generic markdown isn't enough, 
                    // but styling base tags is usually sufficient for "Smart Markdown".
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default ClinicalMarkdown;
