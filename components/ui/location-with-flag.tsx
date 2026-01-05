'use client'

import React from 'react'
import { getCountryCodeFromEmoji, getFlagUrl } from '@/lib/flag-utils'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LocationWithFlagProps {
    location: string;
    className?: string;
}

export function LocationWithFlag({ location, className }: LocationWithFlagProps) {
    // Regex to find flag emoji
    const flagRegex = /[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/;
    // Regex for ISO codes at the beginning (e.g. "ES Español")
    const isoRegex = /^([A-Z]{2})\s/;

    let emoji: string | null = null;
    let countryCode: string | null = null;
    let textDisplay = location;

    const emojiMatch = location.match(flagRegex);
    const isoMatch = location.match(isoRegex);

    if (emojiMatch) {
        emoji = emojiMatch[0];
        countryCode = getCountryCodeFromEmoji(emoji);
        textDisplay = location.replace(emoji, '').trim();
    } else if (isoMatch) {
        countryCode = isoMatch[1].toLowerCase();
        textDisplay = location.replace(isoMatch[0], '').trim();
    } else {
        return <span className={className}>{location}</span>;
    }

    return (
        <span className={cn("inline-flex items-center gap-2", className)}>
            {textDisplay}
            {countryCode ? (
                <div className="relative w-4 h-4 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10 shrink-0">
                    <img
                        src={getFlagUrl(countryCode)}
                        alt={countryCode.toUpperCase()}
                        className="w-full h-full object-cover grayscale-[0.1] saturate-[0.8] contrast-[1.1]"
                        loading="lazy"
                    />
                </div>
            ) : null}
        </span>
    );
}
