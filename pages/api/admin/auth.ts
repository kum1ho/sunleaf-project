import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { username, password } = req.body;
		
		// Перевірка credentials (у production використовуйте env змінні)
		if (username === 'admin' && password === 'admin') {
			return res.status(200).json({
				success: true,
				token: `admin_authenticated_${Date.now()}`
			});
		}
		
		return res.status(401).json({
			success: false,
			error: 'Невірний логін або пароль'
		});
	}
	
	if (req.method === 'GET') {
		// Перевірка токена з headers або cookies
		const token = req.headers.authorization || req.cookies.admin_token;
		
		if (token && token.startsWith('admin_authenticated_')) {
			return res.status(200).json({ success: true });
		}
		
		return res.status(401).json({ success: false });
	}
	
	return res.status(405).json({ error: 'Method not allowed' });
}
