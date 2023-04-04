export type Record = {
    "driver": {
        "timezone": string,
        "eldSettings": {
            "rulesets": [
                {
                    "cycle": "TX 70 hour / 7 day",
                    "jurisdiction": "TX",
                    "restart": "24-hour Restart",
                    "shift": "Texas Intrastate"
                },
                {
                    "break": "Property (off-duty/sleeper)",
                    "cycle": "USA 70 hour / 8 day",
                    "restart": "34-hour Restart",
                    "shift": "US Interstate Property"
                }
            ]
        },
        "id": string,
        "name": string
    },
    "startTime": Date,
    "endTime": Date,
    "logMetaData": any,
    "distanceTraveled": any,
    "dutyStatusDurations": {
        "activeDurationMs": number,
        "onDutyDurationMs": number,
        "driveDurationMs": number,
        "offDutyDurationMs": number,
        "sleeperBerthDurationMs": number,
        "yardMoveDurationMs": number,
        "personalConveyanceDurationMs": number,
        "waitingTimeDurationMs": number
    },
    "pendingDutyStatusDurations": any,
}
