import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-bold text-slate-900">VizanLabs</p>
          <p className="mt-2 max-w-sm text-sm text-slate-600">
            Post projects for free. Find freelance opportunities for free.
            A simple platform to connect clients and freelancers.
          </p>
        </div>
        <div>
          <p className="font-medium text-slate-900">Platform</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/projects" className="hover:text-slate-900">Find Projects</Link></li>
            <li><Link href="/freelancers" className="hover:text-slate-900">Find Freelancers</Link></li>
            <li><Link href="/signup" className="hover:text-slate-900">Sign Up</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-slate-900">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/#how-it-works" className="hover:text-slate-900">How It Works</Link></li>
            <li><span>vizanlabs.com</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} VizanLabs. 100% free marketplace — no payments on platform.
      </div>
    </footer>
  );
}
