import { redirect } from 'next/navigation';
import { loginAction } from '@/app/admin/login/actions';

export default function AdminLoginPage({ searchParams }: { searchParams?: { error?: string } }) {
  return (
    <div className="min-h-screen bg-[#f8f4ec] px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-white p-8 shadow-soft">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive">Admin access</p>
          <h1 className="mt-2 text-3xl font-semibold text-walnut">Sign in</h1>
        </div>

        {searchParams?.error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{searchParams.error}</div>
        ) : null}

        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-walnut">Username</label>
            <input id="username" name="username" type="text" required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 outline-none ring-0" />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-walnut">Password</label>
            <input id="password" name="password" type="password" required className="w-full rounded-xl border border-border bg-cream px-3 py-2.5 outline-none ring-0" />
          </div>
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
}
