import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const username = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '').trim();
  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'change-me';

  if (username !== expectedUsername || password !== expectedPassword) {
    redirect('/admin/login?error=Invalid credentials');
  }

  cookies().set('shww_admin', '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8
  });

  redirect('/admin/dashboard');
}
