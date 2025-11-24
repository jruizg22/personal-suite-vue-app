/**
 * Normalizes empty string fields in an object by converting them to `null`.
 *
 * This utility is useful when working with form data, since HTML inputs often
 * return empty strings (`""`) for fields left blank.
 * Many APIs or databases expect `null` instead of an empty string for missing values.
 *
 * The function creates and returns a shallow copy of the provided object,
 * ensuring the original object remains unchanged.
 *
 * @template T
 * The type of the object being normalized. Must be a record with string keys.
 *
 * @param {T} obj
 * The object whose empty string fields will be normalized.
 *
 * @returns {T}
 * A new object where all properties with value `""` have been replaced by `null`.
 *
 * @example
 * ```ts
 * const input = { id: "", name: "John", description: "" }
 * const output = normalizeEmptyFields(input)
 * // output -> { id: null, name: "John", description: null }
 * ```
 */
export function normalizeEmptyFields<T extends Record<string, any>>(obj: T): T {
    const result: Record<string, any> = { ...obj }
    Object.keys(result).forEach(key => {
        if (result[key] === "") {
            result[key] = null
        }
    })
    return result as T
}