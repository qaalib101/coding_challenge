import path from 'path';
import { promises as fs } from 'fs';
import { getCompliancy } from './compliancy';
import { parseDriverData } from './data_parser';
import { getDailyDriverData } from './daily';
import { getWeeklyData } from './weekly';
import { Compliancy } from '../components';


export async function getDriverData(start: Date, end: Date) {
    if (start > end) {
        return {
            daily: [],
            weekly: [],
            compliancy: {
                isCompliant: true,
                details: {
                    "7 day": {
                        weeks: {},
                        message: "Driver has worked more than 70 hours in a 7 day period without a 34 hour break",
                    },
                    "24 hour": {
                        days: {},
                        message: "A driver cannot work more than 14 hours in a 24 hour period",
                    },
                    "11 hour": {
                        days: {},
                        message: "A driver cannot work more than 11 hours after 8 hours of rest",
                    },
                }
            },
        };
    }
    const data = await parseDriverData();
    const filteredData = data.filter(record => {
        return new Date(record["startTime"]).getTime() >= start.getTime() && new Date(record["startTime"]).getTime() <= end.getTime();
    });

    const driverData = {
        compliancy: await getCompliancy(filteredData),
        daily: await getDailyDriverData(filteredData),
        weekly: await getWeeklyData(filteredData),
    }

    return driverData;
}
