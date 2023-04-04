// test compliancy service function getCompliancy

import { getCompliancy } from "@/pages/service/compliancy";
import { Record } from "@/types";
import { DefaultFilteredData, EmptyFilteredData} from "../../data/records";
// Path: coding_challenge\driver_data\tests\pages\service\compliancy.test.ts

describe("compliancy service", () => {
    it("should return compliancy object", async () => {
        const filteredData = EmptyFilteredData.sort((a, b) => {
            return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        });
        const compliancy = await getCompliancy(filteredData);
        expect(compliancy).toEqual({
            "details": {
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
            },
            "isCompliant": true
        });
    });

    describe("when compliancy is not met", () => {
        it("should return compliancy object with isCompliant set to false", async () => {
            const filteredData = DefaultFilteredData.sort((a, b) => {
                return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
            });
            const compliancy = await getCompliancy(filteredData);
            expect(compliancy).toEqual({
                "details": {
                    "7 day": {
                        weeks: {
                            "02/20/2021": false
                        },
                        message: "Driver has worked more than 70 hours in a 7 day period without a 34 hour break",
                    },
                    "24 hour": {
                        days: {
                            "02/20/2021": false,
                            "02/21/2021": false,
                            "02/22/2021": false,
                            "02/23/2021": false,
                            "02/24/2021": false,
                            "02/25/2021": false,
                            "02/26/2021": false,
                        },
                        message: "A driver cannot work more than 14 hours in a 24 hour period",
                    },
                    "11 hour": {
                        days: {
                            "02/20/2021": true,
                            "02/21/2021": true,
                            "02/22/2021": true,
                            "02/23/2021": true,
                            "02/24/2021": true,
                            "02/25/2021": true,
                            "02/26/2021": true,
                        },
                        message: "A driver cannot work more than 11 hours after 8 hours of rest",
                    },
                },
                "isCompliant": false
            });
        });
    });
    
});
    