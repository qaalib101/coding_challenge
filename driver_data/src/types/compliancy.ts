
export type Compliant = {
    isCompliant: boolean;
    details: {
        "7 day": {
            weeks: Compliancy7DayPeriod;
            message: string;
        };
        "24 hour": {
            days: Compliancy24HourPeriod;
            message: string;
        };
        "11 hour": {
            days: Compliancy11HourPeriod;
            message: string;
        };
    }

}

type Compliancy7DayPeriod = {
    [key: string]: boolean;
}

type Compliancy24HourPeriod = {
    [key: string]: boolean;
}

type Compliancy11HourPeriod = {
    [key: string]: boolean;
}
