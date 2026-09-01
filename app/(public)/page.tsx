export const runtime = 'edge';
import Link from "next/link";
import { ArrowRight, MessageSquare, Search, Upload } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            100% Free — No payments on platform
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find Great Freelance Work.
            <span className="block text-blue-600">Post Projects for Free.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            VizanLabs connects clients and freelancers at zero cost.
            Post projects, submit proposals, chat directly — and share contact details when you agree on a deal.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup?role=client" className={buttonClassName("default", "lg")}>
              Post a Project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/signup?role=freelancer" className={buttonClassName("outline", "lg")}>
              Find Freelance Work
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Upload, title: "Post Projects", desc: "Clients post detailed projects with budget and skills — completely free." },
              { icon: Search, title: "Find Work", desc: "Freelancers browse, filter, and submit proposals at no cost." },
              { icon: MessageSquare, title: "Chat & Connect", desc: "Message directly on platform. Share phone number when deal is done." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
                <Icon className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-slate-900">How It Works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-blue-600">For Clients</p>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li>1. Create a free client account</li>
                <li>2. Post your project with details and budget</li>
                <li>3. Receive proposals from freelancers</li>
                <li>4. Chat, agree on deal, share contact — work offline</li>
              </ol>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-medium text-blue-600">For Freelancers</p>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li>1. Create a free freelancer account</li>
                <li>2. Build your profile and add skills</li>
                <li>3. Browse projects and submit proposals</li>
                <li>4. Chat with clients and get hired</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
