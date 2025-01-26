const sanitizeFileName = (name: string): string => {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};

const truncate = (input: string, maxLength: number): string => {
  return input.length > maxLength ? `${input.slice(0, maxLength)}...` : input;
};

export const generatePDFFileName = (
  courseName: string,
  audienceInput: string
): string => {
  const maxLength = 30;
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const sanitizedCourse = sanitizeFileName(truncate(courseName, maxLength));
  const sanitizedAudience = sanitizeFileName(
    truncate(audienceInput, maxLength)
  );
  return `${sanitizedCourse}_${sanitizedAudience}_${timestamp}.pdf`;
};
