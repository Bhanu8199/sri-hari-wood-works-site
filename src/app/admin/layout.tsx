import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = cookies().get('shww_admin')?.value === '1';

  if (!isLoggedIn) {
    redirect('/admin/login');
  }

  return <div className="bg-[#f8f4ec] min-h-screen">{children}</div>;
}
