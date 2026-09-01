import { SignupForm } from "@/components/forms/signup-form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-12">
        <SignupForm />
      </main>
      <Footer />
    </>
  );
}
