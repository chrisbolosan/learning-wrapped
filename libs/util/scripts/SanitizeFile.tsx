const sanitizeFileName = (name: string): string => {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};

export const generatePDFFileName = (
  courseName: string,
  audienceInput: string
): string => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const sanitizedCourse = sanitizeFileName(courseName);
  const sanitizedAudience = sanitizeFileName(audienceInput);
  return `${sanitizedCourse}_${sanitizedAudience}_${timestamp}.pdf`;
};
