"use client";

import { SignIn } from "@clerk/nextjs";
import AuthConfigNotice from "@/components/AuthConfigNotice";
import AuthPageShell from "@/components/AuthPageShell";
import { authAppearance } from "@/lib/authAppearance";
import { isClerkPublishableConfigured } from "@/lib/clerk-config";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  if (!isClerkPublishableConfigured()) {
    return <AuthConfigNotice />;
  }

  return (
    <AuthPageShell
      eyebrow="Welcome back"
      title="登录 SingClaw"
      subtitle="回到今天的交易任务桌，继续完成机会、风险和复盘计划。"
    >
      <SignIn
        appearance={authAppearance}
        routing="path"
        path="/login"
        forceRedirectUrl="/dashboard"
      />
    </AuthPageShell>
  );
}
