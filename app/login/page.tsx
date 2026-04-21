"use client";

import { useState } from "react";
import GoogleIcon from "@/assets/google.svg";
import LogoIcon from "@/assets/logo.svg";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      "_self",
    );
  };

  return (
    <div className="bg-surface-primary flex h-full items-center justify-center">
      <div className="w-[90%] max-w-md">
        <section className="flex h-full max-w-md flex-col items-center justify-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600">
            <LogoIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-extrabold">Reel Time</h1>
          <p className="text-foreground-tertiary mb-8 text-center text-base">
            Track your time on different projects
          </p>
        </section>

        <section className="bg-surface-card [0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center gap-6 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <button
            className="border-border hover:border-border-hover hover:bg-surface-card-hover text-text-primary flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border-2 bg-white px-6 py-3.5 font-bold transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
                Signing in...
              </>
            ) : (
              <>
                <GoogleIcon className="h-5 w-5" />
                Continue with Google
              </>
            )}
          </button>

          <div className="h-px w-full bg-slate-200" />

          <p className="max-w-3xl text-center text-sm text-slate-500">
            By signing in, you agree to our{" "}
            <a
              className="text-foreground-secondary hover:text-foreground-primary underline-offset-2 hover:underline"
              href={`${process.env.NEXT_PUBLIC_API_URL}/terms`}
            >
              terms
            </a>{" "}
            &{" "}
            <a
              className="text-foreground-secondary hover:text-foreground-primary underline-offset-2 hover:underline"
              href={`${process.env.NEXT_PUBLIC_API_URL}/privacy`}
            >
              privacy policy
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
