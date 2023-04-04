
// test the weekly service

import { getWeeklyData } from "@/pages/service/weekly";
import { DefaultFilteredData, EmptyFilteredData, TwoWeekFilteredData } from "../../data/records";

describe('Weekly Service', () => {
    
    describe('when the filtered data is empty', () => {
        it('should return an empty array', async () => {
            const filteredData = JSON.parse(JSON.stringify(EmptyFilteredData));
            const weeklyData = await getWeeklyData(filteredData);
            expect(weeklyData).toEqual([]);
        });
    });

    describe('when the filtered data is not empty', () => {
        it('should return an array of weekly data', async () => {
            const filteredData = JSON.parse(JSON.stringify(TwoWeekFilteredData));
            const weeklyData = await getWeeklyData(filteredData);
            expect(weeklyData).toEqual([
                {
                  week: "02/14/2021 - 02/20/2021",
                  totalHours: 14,
                  overtimeHours: 13,
                },
                {
                  week: "02/21/2021 - 02/27/2021",
                  totalHours: 101,
                  overtimeHours: 95,
                },
                {
                  week: "02/28/2021 - 03/06/2021",
                  totalHours: 101,
                  overtimeHours: 95,
                },
              ]);
        });
    });
});
