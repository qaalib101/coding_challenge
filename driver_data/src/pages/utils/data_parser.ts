// separate data into Compliant and Non-Compliant dates/weeks
// get the number of compliant and non-compliant dates/weeks
// in form of example {name: "Compliant", value: 4} and {name: "Non-Compliant", value: 1}
// for each type of data

import { Compliant, DailyDriverTableData, WeeklyDriverData } from "@/types";

// get percentage of compliant and non-complian

export function getCompliancePieChartData (data: {
    [key: string]: boolean;
}) {    
    let compliant = 0;
    let nonCompliant = 0;
    for (let key in data) {
        if (data[key]) {
            compliant++;
        } else {
            nonCompliant++;
        }
    }
    let pieData = [
        { name: "Compliant", value: compliant, fill: "#8884d8"},
        { name: "Non Compliant", value: nonCompliant, fill: "#82ca9d"},
    ]
    return pieData;
}

export function getDailyLineChartData (data: DailyDriverTableData[]) {    
    let pieData = [
    ]

    for (let i=0; i < data?.length; i++) {
        pieData.push(
            { date: data[i].date, overtime: data[i].overtimeHours, total: data[i].totalHours}
        );
    }
    return pieData;
}

export function getWeeklyLineChartData (data: WeeklyDriverData[]) {    
    let pieData = [
    ]
    
    for (let i=0; i < data?.length; i++) {
        pieData.push(
            { week: data[i].week, overtime: data[i].overtimeHours, total: data[i].totalHours}
        );
    }
    return pieData;
}

export function getCompliancyTableData(data: Compliant){
    // loop throug the details.
    // return an aary of objects
    // in the example format of {type: "7 day", date: "01/01/2020", isCompliant: "yes"}
    let tableData = [];

    for (let key in data["details"]["7 day"]["weeks"]) {
        tableData.push({
            type: "7 day",
            date: key,
            isCompliant: data["details"]["7 day"]["weeks"][key] ? "yes" : "no"
        })
    }

    for (let key in data["details"]["24 hour"]["days"]) {
        tableData.push({
            type: "24 hour",
            date: key,
            isCompliant: data["details"]["24 hour"]["days"][key] ? "yes" : "no"
        })
    }

    for (let key in data["details"]["11 hour"]["days"]) {
        tableData.push({
            type: "11 hour",
            date: key,
            isCompliant: data["details"]["11 hour"]["days"][key] ? "yes" : "no"
        })
    }

    return tableData;
}