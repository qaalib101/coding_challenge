

// test the drvier service

import { getDriverData } from "@/pages/service";
import * as DataParser from "@/pages/service/data_parser";
import * as Compliancy from "@/pages/service/compliancy";
import * as Daily from "@/pages/service/daily";
import * as Weekly from "@/pages/service/weekly";
import { Compliant, Record } from "@/types";

describe('DriverService', () => {

    describe('should return data', () => {
        beforeEach(() => {
            jest.spyOn(DataParser, 'parseDriverData').mockImplementation(() => {
                return Promise.resolve([]);
            });
            jest.spyOn(Compliancy, 'getCompliancy').mockImplementation((data: Record[]): Promise<Compliant> => {
                return Promise.resolve({} as Compliant);
            });
            jest.spyOn(Daily, 'getDailyDriverData').mockImplementation(() => {
                return Promise.resolve([]);
            });
            jest.spyOn(Weekly, 'getWeeklyData').mockImplementation(() => {
                return Promise.resolve([]);
            });
        });

        it('should return data', async () => {
            const data = await getDriverData(new Date('2020-01-01'), new Date('2020-01-02'));
            expect(data).toBeDefined();
        });

        it('should call the right methods', async () => {
            const parseDriverData = require('@/pages/service/data_parser').parseDriverData;
            const getCompliancy = require('@/pages/service/compliancy').getCompliancy;
            const getDailyDriverData = require('@/pages/service/daily').getDailyDriverData;
            const getWeeklyData = require('@/pages/service/weekly').getWeeklyData;

            await getDriverData(new Date('2020-01-01'), new Date('2020-01-02'));
            expect(parseDriverData).toHaveBeenCalled();
            expect(getCompliancy).toHaveBeenCalled();
            expect(getDailyDriverData).toHaveBeenCalled();
            expect(getWeeklyData).toHaveBeenCalled();
        });
    });
});

