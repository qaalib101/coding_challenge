import type { NextApiRequest, NextApiResponse } from 'next'
import { getDriverData } from '../service';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   const {
      query: { start, end },
    } = req;
    // put a try catch here
    // return 500 is there is an error
    const startDate = new Date(start as string);
    const endDate = new Date(end as string);
    try {
        const data = await getDriverData(startDate, endDate);
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({error: error.message});
    }
}
