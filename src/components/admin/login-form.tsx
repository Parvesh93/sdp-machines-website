"use client";

import { useActionState } from "react";

import { authenticate } from "@/actions/authenticate";

const inputClass =
  "h-11 w-full rounded-[5px] border border-[#d5d5d0] bg-white px-3 text-[14px] text-[#181818] outline-none transition focus:border-[#999994] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]";

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
    <form action={formAction} className="grid gap-[18px]">
      <div className="grid gap-[7px]">
        <label
          htmlFor="email"
          className="text-[12px] font-semibold text-[#444444]"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          required
        />
      </div>

      <div className="grid gap-[7px]">
        <label
          htmlFor="password"
          className="text-[12px] font-semibold text-[#444444]"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className={inputClass}
          required
        />
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className="m-0 rounded-[5px] border border-[#eccaca] bg-[#fff3f3] px-[14px] py-3 text-[12px] text-[#9c3030]"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-[5px] bg-[#161616] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#f36b21] hover:text-[#111111] disabled:cursor-wait disabled:opacity-60"
      >
        {isPending
          ? "Signing in..."
          : "Sign in"}
      </button>
    </form>
  );
}
