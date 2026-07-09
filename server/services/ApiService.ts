import { generateCurlCommand } from '#shared/utils/errors';

export class ApiService {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string, defaultHeaders?: HeadersInit) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders || {};
  }

  private logRequest(method: string, url: string, options: RequestInit) {
    if (import.meta.dev) {
      const cURL = generateCurlCommand(url, options);

      console.groupCollapsed(`🔵 ${method.toUpperCase()} ${url}`);
      console.log('🛠️ OPTIONS:', options);
      console.log('📡 \n' + cURL);
      console.groupEnd();
    }
  }

  private logResponse(method: string, url: string, response: object) {
    if (import.meta.dev) {
      console.groupCollapsed(`🟢 ${method.toUpperCase()} ${url}`);
      console.log('🎯 RESPONSE: ', response);
      console.groupEnd();
    }
  }

  private logError(method: string, url: string, error: unknown) {
    if (import.meta.dev) {
      console.group(`🔴 REQUEST_ERROR ${method.toUpperCase()} ${url}`);
      console.log('❌ ERROR', error);
      console.groupEnd();
    }
  }

  private async request<T extends object>(
    fullUrl: string,
    init: RequestInit & {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    },
  ) {
    this.logRequest(init.method, fullUrl, init);

    try {
      const response = await $fetch<T>(fullUrl, init);
      this.logResponse(init.method, fullUrl, response);
      return response;
    } catch (error) {
      this.logError(init.method, fullUrl, error);
      throw error;
    }
  }

  /**
   * Sends a GET request to the specified URL and returns the response as a typed object.
   *
   * @template T - The expected response type, extending object.
   * @param url - The endpoint URL (relative to the base URL).
   * @param options - Optional fetch request options.
   * @returns A promise resolving to the response data of type T.
   */
  public get<T extends object>(url: string, options?: RequestInit) {
    const fullUrl = `${this.baseURL}${url}`;
    const init: RequestInit & { method: 'GET' } = {
      ...options,
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options?.headers,
      },
    };

    return this.request<T>(fullUrl, init);
  }

  public post<T extends object>(
    url: string,
    body?: object,
    options?: RequestInit,
  ) {
    const fullUrl = `${this.baseURL}${url}`;
    const parsedBody = body instanceof FormData ? body : JSON.stringify(body);

    const headers: HeadersInit & { 'Content-Type'?: string } = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...options?.headers,
    };

    if (body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const init: RequestInit & { method: 'POST' } = {
      ...options,
      method: 'POST',
      body: parsedBody,
      headers,
    };

    return this.request<T>(fullUrl, init);
  }

  public put<T extends object>(
    url: string,
    body?: object,
    options?: RequestInit,
  ) {
    const fullUrl = `${this.baseURL}${url}`;
    const init: RequestInit & { method: 'PUT' } = {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
        ...options?.headers,
      },
    };

    return this.request<T>(fullUrl, init);
  }

  public delete<T extends object>(url: string, options?: RequestInit) {
    const fullUrl = `${this.baseURL}${url}`;
    const init: RequestInit & { method: 'DELETE' } = {
      ...options,
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders,
        ...options?.headers,
      },
    };

    return this.request<T>(fullUrl, init);
  }

  // public async useFetch<T extends object>(url: string, options?: RequestInit) {
  //   const fullUrl = `${this.baseURL}${url}`;
  //   const init: RequestInit & { method: 'GET' } = {
  //     ...options,
  //     method: 'GET',
  //     headers: {
  //       ...this.defaultHeaders,
  //       ...options?.headers,
  //     },
  //   };

  //   this.logRequest(init.method, fullUrl, init);

  //   try {
  //     const response = await useFetch(fullUrl, init);
  //     this.logResponse(init.method, fullUrl, response);

  //     return response.data.value as T;
  //   } catch (error) {
  //     this.logError(init.method, fullUrl, error);
  //     throw error;
  //   }
  // }
}
