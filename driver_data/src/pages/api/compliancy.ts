import type { NextApiRequest, NextApiResponse } from 'next'
import { getCompliancy } from '../service/compliancy';
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
    console.log(start, end, method);
    // convert the start and end dates to Date objects
    // use the getDailyDriverData function to get the data
    // return the data
    const startDate = new Date(start as string);
    const endDate = new Date(end as string);
    const data = await getCompliancy(startDate, endDate);
    res.status(200).json(data);
}
