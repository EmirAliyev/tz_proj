import HttpService from "../HttpService";
import { IUser, IUserResponse } from "./types";

/**
 * A class for interacting with the Users API. It extends the `HttpService` class and provides methods
 * for fetching user data from the API, including a method to retrieve a list of users.
 * 
 * @example
 * const users = await UsersAPI.getList({ page: 1, results: 10 });
 * console.log(users);
 */
export class UsersAPI extends HttpService {
  /**
   * The endpoint to be used when making requests to the Users API.
   * In this case, it's left empty as a base URL for the API can be provided in the `HttpService`.
   */
  static get endpoint(): string {
    return '';
  }

  /**
   * Retrieves a list of users from the API.
   * 
   * @param {Record<string, any>} params - Parameters for filtering or sorting the user data.
   * 
   * @returns {Promise<IUser[]>} - A promise that resolves to an array of `IUser` objects representing users.
   * 
   * @description
   * This method sends a request to the API and retrieves data in the `IUserResponse` format.
   * The API response includes an object with two fields:
   * - `info`: Metadata about the request, such as pagination details.
   * - `results`: An array containing the list of users.
   * 
   * @example
   * const users = await UsersAPI.getList({ page: 1, results: 10 });
   * console.log(users); // Output: [IUser, IUser, ...]
   */
  static async getList(params: Record<string, any>): Promise<IUser[]> {
    const data: IUserResponse = await this.get(`${this.endpoint}`, params);
    return data.results;
  }
}
