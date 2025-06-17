import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '../../lib/openai';
import fs from 'fs';
import path from 'path';

interface Product {
  id: string;
  name: string;
  description?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal } = req.body as { goal: string };

  const filePath = path.join(process.cwd(), 'public', 'vitamins.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Product[];

  // simple relevance: product name or description includes goal keywords
  const keywords = goal.toLowerCase().split(/\s+/);
  const matches = data.filter(p =>
    keywords.some(k => p.name.toLowerCase().includes(k) || (p.description ?? '').toLowerCase().includes(k))
  );

  const selected = matches.slice(0, 3);

  const prompt = `User goal: ${goal}\n\nHere are some vitamin products:\n${selected.map(p => `- ${p.name}`).join('\n')}\n\nBased on the goal, advise which product(s) would be suitable and why.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const answer = completion.choices[0].message?.content ?? '';
    res.status(200).json({ products: selected, answer });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get advice' });
  }
}
