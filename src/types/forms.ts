/**
 * Represents the operating mode of a form component.
 *
 * - **View** — The form is displayed in read-only mode.
 * - **Create** — The form is used to create a new entity.
 * - **Edit** — The form is used to edit an existing entity.
 */
export type FormMode = 'View' | 'Create' | 'Edit'

/**
 * Props shared by reusable form dialog components.
 *
 * This generic interface allows form components to work with any data model
 * while supporting common features such as:
 * - Handling an external `modelValue` (the entity being viewed/edited).
 * - Switching between different form modes (view, create, edit).
 *
 * @template T The type of entity handled by the form (e.g., `YTChannel`).
 *
 * @property {T | null} modelValue
 * The current value passed into the form.
 * When `null`, the form is considered closed or uninitialized.
 *
 * @property {FormMode} mode
 * Determines the behavior of the form:
 * - `"View"` → fields are read-only
 * - `"Create"` → fields start empty and editable
 * - `"Edit"` → fields are prefilled and editable
 */
export interface FormProps<T> {
    modelValue: T | null
    mode: FormMode
}