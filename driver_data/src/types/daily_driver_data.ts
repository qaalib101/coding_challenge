export type DailyDriverData = {
    [key: string]: {
        totalHours: number;
        overtimeHours: number;        
    };
}

export type DailyDriverTableData = {
    date: string;
    totalHours: number;
    overtimeHours: number;
}