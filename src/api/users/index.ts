import HttpService from "../HttpService";
import { IUser, IUserResponse } from "./types";

export class UsersAPI extends HttpService {
  static get endpoint() {
    return '';
  }

  /**
   * Retrieves a list of users from the API.
   *
   * @param {Record<string, any>} params - Parameters for filtering or sorting the user data.
   * @returns {Promise<IUser[]>} - Returns an array of `IUser` objects representing users.
   * @description
   * This method sends a request to the API and retrieves data in the `IUserResponse` format.
   * The API response includes an object with two fields:
   * - `info`: Metadata about the request, such as pagination details.
   * - `results`: An array containing the list of users.
   */
  static async getList(params: Record<string, any>): Promise<IUser[]> {
    const data: IUserResponse = await this.get(`${this.endpoint}`, params);
    return data.results;
  }
}
