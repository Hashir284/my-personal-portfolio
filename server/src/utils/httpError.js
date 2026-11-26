/** An error the error handler turns straight into a JSON response. */
export function httpError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}
