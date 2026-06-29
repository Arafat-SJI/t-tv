import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Loader2 } from "lucide-react";

function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 text-brand animate-spin" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
