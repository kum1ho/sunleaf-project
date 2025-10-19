import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(404).json({ 
    error: 'NextAuth not configured for this project',
    message: 'Use /api/admin/auth for admin authentication' 
  });
}
