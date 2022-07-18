export const result = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  ERROR: 'error',
};

export default function resApi(result, message) {
  return {
    result: result ? 'success' : 'error',
    message: message,
  };
}
