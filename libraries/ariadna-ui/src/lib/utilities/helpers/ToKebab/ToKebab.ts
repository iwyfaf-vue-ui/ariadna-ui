export default function toKebab(string: string): string {
  return (
    string
      // Handle both camelCase and PascalCase while preserving acronyms
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // camelCase conversion
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Acronym followed by word
      .replace(/(^[A-Z])/, (firstChar) => firstChar.toLowerCase()) // PascalCase start
      .toLowerCase()
  );
}
