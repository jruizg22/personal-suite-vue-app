/**
 * Represents the standard structure of an API response.
 *
 * This generic interface is designed to wrap any data returned from an HTTP request
 * along with the HTTP status code. It can be used for CRUD operations or any
 * API call where you want to access both the returned data and the response status.
 *
 * @template T - The type of the data returned by the API.
 *
 * @property {T | null} data - The data returned by the API. `null` if the request failed
 *                             or no data was returned.
 * @property {number | null} status - The HTTP status code of the response. `null` if
 *                                     the request failed and no response was received.
 *
 * @example
 * ```ts
 * const response: ApiResponse<User> = await api.get<User>('/users/1');
 * if (response.status === 200 && response.data) {
 *   console.log("User retrieved:", response.data.name);
 * }
 * ```
 */
export interface ApiResponse<T> {
    data: T | null
    status: number | null
}