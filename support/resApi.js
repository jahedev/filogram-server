export default function resApi(result, message) {
  return {
    result: result ? 'success' : 'error',
    message: message,
  };
}
