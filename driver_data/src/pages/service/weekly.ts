import { Record, WeeklyDriverData } from "@/types"
import { formatDate } from "./date_parser";

export async function getWeeklyData(filteredData: Record[]) {
    // separate the weeks from the filtered data
    // use each Saturday or the last most day as the end of the week
    // use each Sunday or the first most day as the start of the week
    // get the total work hours for each week
    // get the overtime hours for each week

    const weeks = [] as WeeklyDriverData[];
    if (filteredData.length < 7) {
        return weeks;
    }

    // separate the weeks. use saturday and sunday as the end and start of the week
    // if the day does not exists just add 0 to the total hours and overtime hours
    // use the sunday - saturday dates as the week identifier
    let current = new Date();
    let dayOfWeek = current.getDay();
    let end = new Date();
    let start = new Date();
    let week = "";
    let totalHours = 0;
    let overtimeHours = 0;
    for (let i = 0; i < filteredData.length; i++) {
        current = new Date(filteredData[i].startTime);
        dayOfWeek= current.getDay();
        end = getWeekEnd(current);
        start = getWeekStart(current);
        totalHours += filteredData[i].dutyStatusDurations.onDutyDurationMs;
        overtimeHours += filteredData[i].dutyStatusDurations.onDutyDurationMs > 360000 * 8 ? filteredData[i].dutyStatusDurations.onDutyDurationMs - 360000 * 8 : 0;
        if (dayOfWeek === 6 || i === filteredData.length - 1) {
            week = formatDate(start) + " - " + formatDate(end);
            weeks.push({
                week: week,
                totalHours: Math.floor(totalHours / 3600000),
                overtimeHours: Math.floor(overtimeHours / 3600000)
            });
            totalHours = 0;
            overtimeHours = 0;
        }
    }

    return weeks;
}

function getWeekStart(date: Date) {
    // if day of week is not sunday, return the previous sunday
    // if day of week is sunday, return the same date
    // use new date object to avoid changing the original date
    let newDate = new Date(date);
    const dayOfWeek = newDate.getDay();
    if (dayOfWeek !== 0) {
        newDate.setDate(newDate.getDate() - dayOfWeek);
    }
    return newDate;
}

function getWeekEnd(date: Date) {
    // if day of week is not saturday, return the next saturday
    // if day of week is saturday, return the same date
    // use new date object to avoid changing the original date
    let newDate = new Date(date);
    const dayOfWeek = newDate.getDay();
    if (dayOfWeek !== 6) {
        newDate.setDate(newDate.getDate() + 6 - dayOfWeek);
    }
    return newDate;
}

