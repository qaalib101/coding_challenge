import { useState, useEffect, SyntheticEvent } from "react";
import { Table } from 'rsuite';
import { DailyDriverTableData, Record } from "@/types";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip} from "recharts";
import { getDailyLineChartData } from "../utils/data_parser";

type DailyProps = {
    data: DailyDriverTableData[];
};

export function Daily(props: DailyProps) {
    const { data } = props;
    const { Column, HeaderCell, Cell } = Table;
    const linechartData = getDailyLineChartData(data);
    return (
        <div className="py-4 space-y-9">
            <div className="text-2xl text-center">Daily Summary</div>
            <div className="flex space-x-3">
                <div className="w-1/2">
                    <ResponsiveContainer width="100%" height="90%">
                        <LineChart
                            width={500}
                            data={linechartData}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="overtime"
                                stroke="#8884d8"
                            />
                            <Line type="monotone" dataKey="total" stroke="#82ca9d"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-1/2">
                    <Table
                        height={400}
                        data={data}
                        >
                        <Column flexGrow={1}>
                            <HeaderCell>Date</HeaderCell>
                            <Cell dataKey="date" />
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Total Hours</HeaderCell>
                            <Cell dataKey="totalHours" />
                        </Column>

                        <Column flexGrow={1}>
                            <HeaderCell>Overtime</HeaderCell>
                            <Cell dataKey="overtimeHours" />
                        </Column>
                    </Table>
                </div>
            </div>
        </div>
    )
}
