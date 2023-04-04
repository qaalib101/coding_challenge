import { getCompliancePieChartData } from "@/pages/utils";
import { Compliant } from "@/types";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, Text} from "recharts";

type CompliancyGraphsProps = {
    compliancy: Compliant;
};

export function CompliancyGraphs(props: CompliancyGraphsProps){
    const { compliancy } = props;
    const { isCompliant, details } = compliancy;
    const pieData7Day = getCompliancePieChartData(details["7 day"]["weeks"]);
    const pieData24Hour = getCompliancePieChartData(details["24 hour"]["days"]);
    const pieData11Hour = getCompliancePieChartData(details["11 hour"]["days"]);

    let renderLabel = function(entry) {
        return entry.name;
    }

    return (
        <>
            <div className="w-1/3 space-y-1">
                {
                    !isPieDataEmpty(pieData7Day) ? (
                        <>
                            <div className="h-1/10 text-base text-center underline underline-offset-2">7 DAY COMPLIANCE</div>
                            <ResponsiveContainer width="100%" height="90%">
                                <PieChart width={400} height={400} title="Chart of PU x UV">
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={pieData7Day}
                                        innerRadius={60}
                                        outerRadius={80} 
                                        cx="50%"
                                        cy="50%"
                                        fill="#8884d8"
                                        label = {renderLabel}
                                        />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
            <div className="w-1/3">
                {
                    !isPieDataEmpty(pieData24Hour) ? (
                        <>
                            <div className="h-1/10 text-base text-center underline underline-offset-2">24 HOUR COMPLIANCE</div>
                            <ResponsiveContainer width="100%" height="90%">
                                <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={pieData24Hour}
                                    innerRadius={60}
                                    outerRadius={80}
                                    cx="50%"
                                    cy="50%"
                                    fill="#8884d8"
                                    label = {renderLabel}
                                    />
                                <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </>) : (
                        <></>
                        )
                }

            </div>
            <div className="w-1/3">
                {
                    !isPieDataEmpty(pieData11Hour) ? (
                        <>
                            <div className="h-1/10 text-base text-center underline underline-offset-2">11 HOUR COMPLIANCE</div>
                            <ResponsiveContainer width="100%" height="90%">
                                <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={pieData11Hour}
                                    innerRadius={60}
                                    outerRadius={80}
                                    cx="50%"
                                    cy="50%"
                                    fill="#8884d8"
                                    label = {renderLabel}
                                    />
                                <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </>) : (
                        <></>
                        )
                }
            </div>
        </>
    )
}

function isPieDataEmpty(pieData: {
    name: string;
    value: number;
    fill: string;
}[]) {
    // check if all the values are 0
    // if yes, return true
    // else return false
    return pieData.every((data) => data.value === 0);
}