

// create test for all the functions in data_parser.ts

import { getCompliancePieChartData, getCompliancyTableData, getDailyLineChartData, getWeeklyLineChartData } from "@/pages/utils";

describe('data_parser', () => {
    describe('getCompliancePieChartData', () => {
        it('should parse the driver data', () => {
        const driverData = getCompliancePieChartData({
            "01-01-2020": true,
            "01-02-2020": true,
            "01-03-2020": true,
            "01-04-2020": false,
            "01-05-2020": false,
        });
        expect(driverData).toEqual([{
                fill: "#8884d8",
                name: "Compliant",
                value: 3,
            }, {
                fill: "#82ca9d",
                name: "Non Compliant",
                value: 2,
            }]);
        });
    });
    
    describe('getDailyLineChartData', () => {
        it('should get the daily line chart data', () => {
        const tripData = getDailyLineChartData([
            {
                "date": "02/26/2021",
                "totalHours": 14,
                "overtimeHours": 6
            },
            {
                "date": "02/27/2021",
                "totalHours": 14,
                "overtimeHours": 6
            }
        ]);
        expect(tripData).toEqual([
            {
                "date": "02/26/2021",
                "total": 14,
                "overtime": 6
            },
            {
                "date": "02/27/2021",
                "total": 14,
                "overtime": 6
            }
        ]);
        });
    });
    
    describe('getWeeklyLineChartData', () => {
        it('should get the driver data', () => {
        const driverData = getWeeklyLineChartData([
            {
                "week": "02/21/2021 - 02/27/2021",
                "totalHours": 101,
                "overtimeHours": 95
            }
        ]);
        expect(driverData).toEqual([
            {
                "week": "02/21/2021 - 02/27/2021",
                "total": 101,
                "overtime": 95
            }
        ]);
        });
    });
    
    describe('getCompliancyTableData', () => {
        it('should get correct table data', () => {
        const tripData = getCompliancyTableData({
            "isCompliant": false,
            "details": {
                "7 day": {
                    "weeks": {},
                    "message": "Driver has worked more than 70 hours in a 7 day period without a 34 hour break"
                },
                "24 hour": {
                    "days": {
                        "02/25/2021": false,
                        "02/26/2021": false,
                        "02/27/2021": false
                    },
                    "message": "A driver cannot work more than 14 hours in a 24 hour period"
                },
                "11 hour": {
                    "days": {
                        "02/25/2021": true,
                        "02/26/2021": true,
                        "02/27/2021": true
                    },
                    "message": "A driver cannot work more than 11 hours after 8 hours of rest"
                }
            }
        });

        expect(tripData).toEqual([
            {
                type: "24 hour",
                date: "02/25/2021",
                isCompliant: "no",
            },
            {
                type: "24 hour",
                date: "02/26/2021",
                isCompliant: "no",
            },
            {
                type: "24 hour",
                date: "02/27/2021",
                isCompliant: "no",
            },
            {
                type: "11 hour",
                date: "02/25/2021",
                isCompliant: "yes",
            },
            {
                type: "11 hour",
                date: "02/26/2021",
                isCompliant: "yes",
            },
            {
                type: "11 hour",
                date: "02/27/2021",
                isCompliant: "yes",
            },
        ]);
        });
    });
});