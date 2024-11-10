/**
 * @remarks
 * This class uses the Fetch API to perform HTTP requests and throws errors in case of failed requests.
 * All methods return promises that resolve with the response data or throw errors.
 */
class HttpService {
  /**
   * The base URL for the API requests.
   */
  static readonly BASE_URL = 'https://randomuser.me/api';

  /**
   * Makes an HTTP request and returns the response data as a parsed JSON object.
   * 
   * @param endpoint - The endpoint to which the request is made.
   * @param options - The optional configuration for the request (e.g., method, headers, body).
   * 
   * @returns A promise that resolves to the response data parsed as JSON.
   * @throws An error if the HTTP request fails or if the response status is not OK.
   * 
   * @example
   * const data = await HttpService.request('/users', { method: 'GET' });
   * console.log(data);
   */
  static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${HttpService.BASE_URL}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    }
  }

  /**
   * Builds a query string from an object of parameters to be appended to a URL.
   * 
   * @param params - An object with key-value pairs representing query parameters.
   * 
   * @returns A query string starting with "?" if parameters are provided, otherwise an empty string.
   * 
   * @example
   * const queryString = HttpService.buildQueryString({ results: 10, gender: 'male' });
   * console.log(queryString); // Output: "?results=10&gender=male"
   */
  static buildQueryString(params: Record<string, string | number | boolean>): string {
    const query = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    );
    return query.toString() ? `?${query.toString()}` : '';
  }

  /**
   * Sends a GET request to the specified endpoint with optional query parameters.
   * 
   * @param endpoint - The endpoint to which the GET request is made.
   * @param params - An object with query parameters to be appended to the endpoint.
   * 
   * @returns A promise that resolves to the response data parsed as JSON.
   * 
   * @example
   * const data = await HttpService.get('/users', { results: 10 });
   * console.log(data);
   */
  static async get<T>(endpoint: string, params: Record<string, string | number | boolean>): Promise<T> {
    const queryString = this.buildQueryString(params);
    return this.request(`${endpoint}${queryString}`, { method: 'GET' });
  }
}

export default HttpService;