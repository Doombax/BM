export function normalizeImageUri(foto) {
  if (!foto) return null;
  if (typeof foto !== 'string') return null;
  const trimmed = foto.trim();
  if (trimmed.startsWith('http') || trimmed.startsWith('https') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  // Assume raw base64 string (no data: prefix)
  return `data:image/jpeg;base64,${trimmed}`;
}

export default normalizeImageUri;
