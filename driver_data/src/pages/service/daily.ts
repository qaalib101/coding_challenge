import { DailyDriverData, DailyDriverTableData, Record } from '@/types';
import { parseDriverData } from './data_parser';
import { formatDate } from './date_parser';
// Provide a daily summary of hours worked
// Calculate daily pay based on hours worked
// Calculate overtime based on hours worked over 8 hours
export async function getDailyDriverData(filteredData: Record[]) {
    const dailyDriverdata = {
    } as DailyDriverData;
    for(let i = 0; i < filteredData.length; i++) {
        let formattedDate = formatDate(new Date(filteredData[i].startTime));
        dailyDriverdata[formattedDate] = {
            totalHours: Math.floor(filteredData[i]["dutyStatusDurations"]["onDutyDurationMs"]/3600000),
            overtimeHours: Math.floor((filteredData[i]["dutyStatusDurations"]["onDutyDurationMs"] > 3600000 * 8) ? 
            (filteredData[i]["dutyStatusDurations"]["onDutyDurationMs"] - 8 * 3600000) / 3600000 : 0)
        }
    }
    // format the data {date: date, totalHours: totalHours, overtime: overtime}

    const returnData = [] as DailyDriverTableData[];
    Object.keys(dailyDriverdata).forEach(key => {
        returnData.push({  
            date: key,
            totalHours: dailyDriverdata[key].totalHours,
            overtimeHours: dailyDriverdata[key].overtimeHours
        });
    });
    return returnData;
}
