import { getDailyDriverData } from "@/pages/service/daily";
import { DefaultFilteredData, EmptyFilteredData } from "../../data/records";

// test the daily service
describe('Daily Service', () => {
    describe('if the filtered data is empty', () => {
        it('should return an empty array', async () => {
            const filteredData = JSON.parse(JSON.stringify(EmptyFilteredData));
            const dailyDriverData = await getDailyDriverData(filteredData);
            expect(dailyDriverData).toEqual([]);
        });
    });

    describe('if the filtered data is not empty', () => {
        it('should return an array of daily driver data', async () => {
            const filteredData = JSON.parse(JSON.stringify(DefaultFilteredData));
            const dailyDriverData = await getDailyDriverData(filteredData);
            expect(dailyDriverData).toEqual([
                {
                    date: '02/20/2021',
                    totalHours: 14,
                    overtime: 6,
                },
                {
                    date: '02/21/2021',
                    totalHours: 14,
                    overtime: 6,
                },
                {
                    date: '02/22/2021',
                    totalHours: 14,
                    overtime: 6,
                },
                {
                    date: '02/23/2021',
                    totalHours: 14,
                    overtime: 6,
                },
                {
                    date: '02/24/2021',
                    totalHours: 14,
                    overtime: 6,
                },
                {
                    date: '02/25/2021',
                    totalHours: 14,
                    overtime: 6,
                },
                {
                    date: '02/26/2021',
                    totalHours: 14,
                    overtime: 6,
                },
            ]);
        });
    });
});
