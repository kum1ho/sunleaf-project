import type { NextApiRequest, NextApiResponse } from 'next';
import Credentials from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/password';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: 'jwt' },
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Пароль', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const admin = await prisma.admin.findUnique({ where: { email: credentials.email } });
				if (!admin) return null;
				const ok = await verifyPassword(credentials.password, admin.password);
				if (!ok) return null;
				return { id: String(admin.id), email: admin.email, role: 'admin' } as any;
			},
		}),
	],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// NextAuth не використовується в цьому проєкті.
	// Для авторизації адміністратора використовуйте POST /api/admin/auth (JWT).
	return res.status(404).json({ error: 'NextAuth disabled. Use /api/admin/auth for admin login.' });
}
