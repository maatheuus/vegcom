# Feature: auth

Handles all user authentication flows: login, multi-step signup, password reset, and token lifecycle management.

## Responsibilities

- **Login** — email + password form, stores JWT on success
- **Signup** — multi-step flow: form → email verification (OTP) → user information → success
- **Forgot password** — sends password reset email via the backend
- **Token management** — stores/removes `vegcom_access_token` in localStorage
- **Auth guard** — `AuthGuard` component redirects unauthenticated users away from private pages
- **Current user** — `useGetUser()` hook provides the authenticated user's data throughout the app

## Structure

```
auth/
├── api/
│   ├── authApi.ts                  # Raw API calls: signin, signup, forgotPassword, checkEmail
│   ├── types.ts                    # API request/response types
│   └── queries/
│       ├── getAuthApiClient.ts     # React Query hooks (client-side)
│       └── getAuthApiServer.ts     # Server-side current-user fetch
├── components/
│   ├── AuthGuard.tsx               # Redirects unauthenticated users
│   ├── Header/                     # Auth pages shared header
│   ├── Footer/                     # Auth pages shared footer
│   ├── Heading/                    # Auth page title component
│   ├── Login/
│   │   ├── Card.tsx                # Login page card layout
│   │   ├── Form.tsx                # Login form (email + password)
│   │   └── BackgroundItems.tsx     # Decorative background SVG elements
│   ├── Signup/
│   │   ├── SignupFlow.tsx          # Orchestrates the multi-step signup
│   │   ├── StepProgress.tsx        # Visual step indicator
│   │   ├── Form.tsx                # Step 1: email + password
│   │   ├── CodeConfirm.tsx         # Step 2: OTP email verification
│   │   ├── UserInformation.tsx     # Step 3: profile details
│   │   ├── CodeChecked.tsx         # Verification success indicator
│   │   ├── SignupCard.tsx          # Shared card wrapper
│   │   ├── BackgroundItems.tsx     # Decorative background SVG elements
│   │   └── ProgressView/Steps/
│   │       ├── FormPage.tsx
│   │       ├── CodeConfirmPage.tsx
│   │       ├── VerificationPage.tsx
│   │       ├── UserInformationPage.tsx
│   │       └── SuccessPage.tsx
│   ├── ForgotPassword/
│   │   ├── Card.tsx
│   │   └── Form.tsx
│   └── SubmitButton/               # Loading-aware submit button
├── hooks/
│   ├── mutations/useSignup.ts      # Multi-step signup mutation
│   ├── queries/useGetSignupUser.ts # Fetch user during signup flow
│   ├── queries/useSignupFormState.ts # Manage signup step state
│   └── useLogout.ts               # Clears token and React Query cache
├── types/index.ts
├── utils.ts                        # Auth utility helpers
└── index.ts
```

## Key Hooks (from `getAuthApiClient.ts`)

| Hook | Type | Description |
|------|------|-------------|
| `useGetUser()` | Query | Fetches the current authenticated user (`GET /auth/me`) |
| `useSignin()` | Mutation | Logs in, stores `vegcom_access_token` in localStorage |
| `useSignup()` | Mutation | Registers user; clears token (no auto-login) |
| `useLogout()` | — | Clears token and React Query cache (lives in `hooks/useLogout.ts`, not in `getAuthApiClient.ts`) |
| `useCheckEmail()` | Mutation | Validates email availability during signup |

## Token Lifecycle

```
Login success  → localStorage.setItem("vegcom_access_token", token)
Logout         → localStorage.removeItem("vegcom_access_token") + queryClient.clear()
401 response   → localStorage.removeItem("vegcom_access_token") [via Axios interceptor]
```

## Signup Flow (Steps)

1. **Form** — email, password, name
2. **CodeConfirm** — 6-digit OTP sent to email
3. **UserInformation** — culinary level, dietary preference, city, bio
4. **Success** — redirect to login
