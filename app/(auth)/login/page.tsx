import { LoginForm } from "@/components/forms/login-form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-12">
        <LoginForm message={message} />
      </main>
      <Footer />
    </>
  );
}
