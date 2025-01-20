export const validateCourseInputs = (inputs: {
  sessionInput: string;
  audienceInput: string;
}) => {
  const errors: {
    sessionInput: string;
    audienceInput: string;
  } = {
    sessionInput: '',
    audienceInput: '',
  };

  if (!inputs.sessionInput.trim())
    errors.sessionInput = 'Please describe the session instructions.';
  if (!inputs.audienceInput.trim())
    errors.audienceInput = 'Please specify the audience details.';

  return {
    isValid: !Object.values(errors).some((error) => error),
    errors,
  };
};
