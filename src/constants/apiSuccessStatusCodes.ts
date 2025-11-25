/**
 * Defines standard HTTP status codes that indicate a successful response from the API.
 *
 * These codes are commonly used to determine whether a CRUD operation has
 * succeeded. They can be used in combination with an `ApiResponse<T>` type
 * or in any function that performs HTTP requests.
 *
 * @constant
 * @type {Object<string, number>}
 *
 * @property {number} SUCCESS - HTTP 200 OK: The request was successful.
 * @property {number} CREATED - HTTP 201 Created: A new resource has been successfully created.
 * @property {number} DELETED - HTTP 204 No Content: The resource has been successfully deleted.
 *
 * @example
 * ```ts
 * if (response.status === ApiSuccessStatusCodes.CREATED) {
 *   console.log("Resource created successfully")
 * }
 * ```
 */
export const ApiSuccessStatusCodes = {
    SUCCESS: 200,
    CREATED: 201,
    DELETED: 204
}