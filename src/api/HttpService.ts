const BASE_URL = 'https://randomuser.me/api';

class HttpService {
  static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      throw error;
    }
  }

  /**
   * Builds a query string from an object of parameters.
   * @param params - An object with key-value pairs representing query parameters.
   * @returns A query string starting with "?" if params are provided, otherwise an empty string.
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

  static async get<T>(endpoint: string, params: Record<string, string | number | boolean>): Promise<T> {
    const queryString = this.buildQueryString(params);
    return this.request(`${endpoint}${queryString}`, { method: 'GET' });
  }
}

export default HttpService;
