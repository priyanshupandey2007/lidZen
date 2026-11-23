import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', ['GET', 'HEAD']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { format } = req.query;
  const isDmg = format === 'dmg';
  const fileName = isDmg ? 'lidZen.dmg' : 'lidZen.zip';
  const contentType = isDmg ? 'application/x-apple-diskimage' : 'application/zip';

  const filePath = path.join(process.cwd(), 'public', fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Download package not found' });
  }

  const stat = fs.statSync(filePath);

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');

  if (req.method === 'HEAD') {
    return res.status(200).end();
  }

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
}
