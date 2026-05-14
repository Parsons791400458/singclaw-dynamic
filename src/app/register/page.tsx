"use client";

import { SignUp } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-24 px-4 flex items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-gray-900 border border-gray-800 shadow-xl",
            formFieldInput__phoneNumber: "hidden",
            formFieldLabel__phoneNumber: "hidden",
            formFieldRow__phoneNumber: "hidden",
            dividerLine: "hidden",
            socialButtonsBlockButton: "hidden",
          },
        }}
        routing="path"
        path="/register"
        redirectUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
}
