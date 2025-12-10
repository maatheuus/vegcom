/**
 * Auth feature exports
 *
 * This module exports the API, types, and hooks associated with user authentication
 * and registration flows.
 */

// API
export * from "./api/authApi";

// Types
export * from "./types";

// Hooks
export { default as useSignup } from "./hooks/mutations/useSignup";
export { default as useGetSignupUser } from "./hooks/queries/useGetSignupUser";
export { useSignupFormState } from "./hooks/queries/useSignupFormState";
export type { SignupFormData, Step } from "./hooks/queries/useSignupFormState";
