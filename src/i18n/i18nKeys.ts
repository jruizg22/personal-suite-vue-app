/**
 * `commonKeys` is a readonly object containing translation keys
 * for general/common UI elements used throughout the application.
 *
 * Keys are structured hierarchically to match dialogs, actions,
 * form fields, and general messages.
 *
 * This object is intended for use with i18n translation functions.
 *
 * @example
 * import { commonKeys } from "@/i18nKeys";
 * t(commonKeys.actions.save); // => "Save"
 * t(commonKeys.fields.name);  // => "Name"
 */
export const commonKeys = {
    welcome: "common.welcome",
    start: "common.start",
    settings: "common.settings",
    language: "common.language",
    actions: "common.actions",
    id: "common.id",
    name: "common.name",
    url: "common.url",
    description: "common.description",
    details: "common.details",
    edit: "common.edit",
    delete: "common.delete",
    cancel: "common.cancel",
    save: "common.save",
    new: "common.new",
    close: "common.close",
    search: "common.search",
    select: "common.select",
    confirm: "common.confirm",
    yes: "common.yes",
    no: "common.no",
    sorting: {
        sortBy: "common.sorting.sort_by",
        sortAscending: "common.sorting.sort_ascending",
        sortDescending: "common.sorting.sort_descending",
    },
    formFieldValidations: {
        required: "common.form_field_validations.required",
        invalidNumber: "common.form_field_validations.invalid_number",
        invalidUrl: "common.form_field_validations.invalid_url",
    },
    pagination: {
        rowsPerPage: "common.pagination.rows_per_page",
        displayedRows: "common.pagination.displayed_rows",
        displayedRowsMoreThan: "common.pagination.displayed_rows_more_than",
    }
} as const