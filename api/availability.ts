
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const { calendarId } = req.query;

  if (!calendarId) {
    return res.status(400).json({ error: 'Missing calendarId' });
  }

  const calendarUrls: { [key: string]: string } = {
    'deluxe': 'https://ical.booking.com/v1/export?t=6a508e72-47b8-441e-ab73-221ae38f7f5b',
    'suite': 'https://ical.booking.com/v1/export?t=434277a1-8068-4518-b3d6-4699fcb96435',
  };

  const targetUrl = calendarUrls[calendarId as string];

  if (!targetUrl) {
    return res.status(400).json({ error: 'Invalid calendarId' });
  }

  try {
    const response = await fetch(targetUrl);
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calendar data' });
  }
}
