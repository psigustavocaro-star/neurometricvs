export function getCountryCodeFromEmoji(emoji: string): string | null {
    // Check if the string contains a flag emoji sequence
    // Flags are two regional indicator symbols in the range U+1F1E6 to U+1F1FF
    const regex = /[\uD83C][\uDDE6-\uDDFF]/g;
    const matches = emoji.match(regex);

    if (matches && matches.length === 2) {
        // Not a standard join, but let's see how they come in
    }

    // A more reliable way for single flag strings
    const codePoints = Array.from(emoji)
        .map(char => char.codePointAt(0))
        .filter(cp => cp !== undefined && cp >= 0x1F1E6 && cp <= 0x1F1FF)
        .map(cp => String.fromCharCode(cp! - 0x1F1E6 + 65));

    if (codePoints.length === 2) {
        return codePoints.join('').toLowerCase();
    }

    return null;
}

export function getFlagUrl(countryCode: string): string {
    return `https://flagcdn.com/w40/${countryCode}.png`;
}
