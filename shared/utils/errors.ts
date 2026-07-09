import { FetchError } from 'ofetch';
import { WDStrings } from 'widelab-utils';

/**
 * Generates a cURL command string based on the provided URL and request options.
 *
 * @param url - The URL to which the request is made.
 * @param options - The request options, including method, headers, and body.
 * @returns A string representing the equivalent cURL command.
 *
 * @remarks
 * - The `method` defaults to 'GET' if not specified in the options.
 * - If the `content-type` header is not provided, it defaults to 'application/json'.
 * - The function formats headers and body appropriately for inclusion in the cURL command.
 *
 * @example
 * ```typescript
 * const url = 'https://api.example.com/resource';
 * const options: RequestInit = {
 *   method: 'POST',
 *   headers: {
 *     'content-type': 'application/json',
 *     'Authorization': 'Bearer token'
 *   },
 *   body: JSON.stringify({ key: 'value' })
 * };
 * const curlCommand = generateCurlCommand(url, options);
 * console.log(curlCommand);
 * ```
 */
export function generateCurlCommand(url: string, options: RequestInit) {
  const method = options.method ? options.method.toUpperCase() : 'GET';

  const headerList = Object.entries(options.headers || []).map(
    ([key, value]) => {
      const valueByKey = WDStrings.compareStrings(key, 'content-type')
        ? 'application/json'
        : '';
      const validValue = value ?? valueByKey;
      return `--header '${key}: ${validValue}'`;
    },
  );

  const headers = options.headers ? '\\\n' + headerList.join(' \\\n') : '';
  const data = options.body ? `\\\n--data-raw ${options.body}` : '';

  const cURL = `curl '${url}' \\\n--request ${method} ${headers} ${data}`;
  return cURL.trim();
}

/**
 * Handle an API error by attempting to extract a user-friendly message and rethrowing.
 *
 * This function inspects the provided `error` (expected to be a FetchError-like object).
 * If the error contains a `response._data` object with an `errors` array, it will throw
 * a new Error using the first error's `message`. If that message is not present, it
 * falls back to the default message `'Erro ao efetuar login'`. If the specific shape
 * is not found, the original error is rethrown unchanged.
 *
 * The expected shape inspected on the response data is:
 * { errors?: { message?: string }[] }
 *
 * @param error - The error to handle (unknown; typically a FetchError instance).
 * @throws When a message can be extracted from `response._data.errors[0].message`
 *                  or when the default message `'Erro ao efetuar login'` is used.
 * @throws Rethrows the original error if a specific message cannot be extracted.
 * @returns  This function always throws; it does not return.
 */
export const handleApiError = (error: unknown) => {
  if (error instanceof FetchError) {
    if (error.response) {
      const response: { errors?: { message?: string }[] } =
        error.response._data;

      if (response.errors && response.errors.length > 0) {
        const [err] = response.errors;

        if (err?.message) {
          throw new Error(err.message);
        }
      }
    }
  }

  throw error;
};
