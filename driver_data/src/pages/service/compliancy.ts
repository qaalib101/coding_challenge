import { Compliant, Record } from '@/types';
import { formatDate } from './date_parser';

export async function getCompliancy(filteredData: Record[]) {
    // get the data for the last 7 days
    // get the data for the last 24 hours
    // get the data for the last 8 hours
    var isCompliant = true;
    // separate the start and end into individual days. use them as keys in compliancy object
    // get days from start to end

    let compliancy = {
        isCompliant: isCompliant,
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
    } as Compliant;
    if(filteredData.length === 0){
        return compliancy;
    }
    const start = new Date(filteredData[0].startTime);
    const end = new Date(filteredData[filteredData.length - 1].endTime);
    // A driver cannot work more than 70 hours in a 7 day period without a 34 hour break
    if(end.getTime() - start.getTime() >= 7 * 24 * 60 * 60 * 1000) {
        // break the data into 7 day chunks
        // use the start date as the first day of the week
        // skip the last chunk if it is less than 7 days
        // check if every record has onDutyDurationMs of less than or equal to 70 hours
        let weekStart = new Date(start);
        let weekEnd = new Date(start);
        weekEnd.setDate(weekEnd.getDate() + 7);
        while(weekEnd.getTime() <= end.getTime()) {
            let isWeekCompliant = true;
            let weekData = filteredData.filter(record => {
                return new Date(record.startTime).getTime() >= weekStart.getTime() && new Date(record.startTime).getTime() < weekEnd.getTime();
            });
            let totalDays = 0;
            let totalHours = 0;
            weekData.forEach(record => {
                totalDays += record["dutyStatusDurations"]["onDutyDurationMs"] > 0 ? 1 : 0;
                totalHours += record["dutyStatusDurations"]["onDutyDurationMs"];
            });

            if(totalHours > 70 * 60 * 60 * 1000 && totalDays == 7) {
                isWeekCompliant = false;
                isCompliant = false;
            }

            compliancy.details["7 day"]["weeks"][formatDate(weekStart)] = isWeekCompliant;

            weekStart.setDate(weekStart.getDate() + 7);
            weekEnd.setDate(weekEnd.getDate() + 7);
        }

    }

    // A driver cannot work more than 14 hours in a 24 hour period
    // check if every record has onDutyDurationMs of less than or equal to 14 hours
    // check if every record is compliant. then add date to compliancy object and whether it is compliant or not

    let compliant = true;
    let formattedDate = "";
    filteredData.forEach(record => {
        compliant = true;
        formattedDate = formatDate(record.startTime);
        if(record["dutyStatusDurations"]["onDutyDurationMs"] > 14 * 60 * 60 * 1000) {
            compliant = false;
            isCompliant = false;            
        }
        compliancy.details["24 hour"]["days"][formattedDate] = compliant;
    });

    // A driver cannot work more than 11 hours after 8 hours of rest
    filteredData.forEach(record => {
        compliant = true;
        formattedDate = formatDate(record.startTime);
        if(record["dutyStatusDurations"]["onDutyDurationMs"] > 19 * 60 * 60 * 1000 && 
        record["dutyStatusDurations"]["onDutyDurationMs"] - record["dutyStatusDurations"]["activeDurationMs"] >= 8 * 60 * 60 * 1000) {
            compliant = false;
            isCompliant = false;
        }
        compliancy.details["11 hour"]["days"][formattedDate] = compliant;
    });
    compliancy.isCompliant = isCompliant;
    return compliancy;
}
