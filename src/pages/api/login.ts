import type { NextApiRequest, NextApiResponse } from "next";
import { port } from '../../app';

interface LoginResponse {
    success: boolean;
    message?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const response = await fetch(`http://localhost:${port}/auth/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                return res.status(200).json({ success: true, message: "Login successful" });
            } else {
                return res.status(400).json({ success: false, message: data.message})
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "An error occured"})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}