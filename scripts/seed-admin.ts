import { prisma } from '../lib/prisma';
import { hashPassword } from '../lib/password';

async function main() {
	const email = process.env.ADMIN_EMAIL || 'admin@sunleaf.ua';
	const pwdHashEnv = process.env.ADMIN_PASSWORD_HASH;
	if (!pwdHashEnv) {
		console.error('ADMIN_PASSWORD_HASH is required (bcrypt hash).');
		process.exit(1);
	}
	const existing = await prisma.admin.findUnique({ where: { email } });
	if (existing) {
		console.log('Admin already exists:', email);
		return;
	}
	await prisma.admin.create({ data: { email, password: pwdHashEnv } });
	console.log('Admin created:', email);
}

main().then(() => process.exit(0)).catch((e) => {
	console.error(e);
	process.exit(1);
});
