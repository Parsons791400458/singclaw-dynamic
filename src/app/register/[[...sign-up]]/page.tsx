"use client";

import { SignUp } from "@clerk/nextjs";
import AuthConfigNotice from "@/components/AuthConfigNotice";
import AuthPageShell from "@/components/AuthPageShell";
import { registerAppearance } from "@/lib/authAppearance";
import { isClerkPublishableConfigured } from "@/lib/clerk-config";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  if (!isClerkPublishableConfigured()) {
    return <AuthConfigNotice />;
  }

  return (
    <AuthPageShell
      eyebrow="Create account"
      title="注册 SingClaw"
      subtitle="推荐使用邮箱注册。第一版免费，用一个账号保存你的每日计划和复盘记录。"
    >
      <SignUp
        appearance={registerAppearance}
        routing="path"
        path="/register"
        forceRedirectUrl="/dashboard"
      />
    </AuthPageShell>
  );
}
