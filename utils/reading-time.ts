export const calculateReadingTime = (text: string, wordsPerMinute: number = 200): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const getReadingTimeFromExcerpt = (excerpt?: string): number => {
  if (!excerpt) return 5;
  return Math.max(1, Math.ceil(excerpt.length / 250));
};