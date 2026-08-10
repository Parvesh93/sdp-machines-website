"use client";

import {
  useActionState,
} from "react";

import {
  authenticate,
} from "@/actions/authenticate";

export function LoginForm() {
  const [
    errorMessage,
    formAction,
    isPending,
  ] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      {errorMessage ? (
        <p role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Signing in..."
          : "Sign in"}
      </button>
    </form>
  );
}