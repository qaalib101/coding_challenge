import type { NextApiRequest, NextApiResponse } from 'next'
import { getDailyDriverData } from '../service/daily';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const {
      query: { start, end },
      method,
    } = req;
    const startDate = new Date(start as string);
    const endDate = new Date(end as string);
    const data = await getDailyDriverData(startDate, endDate);
    res.status(200).json(data);
}
