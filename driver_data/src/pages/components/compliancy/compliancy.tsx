import { Compliant } from "@/types";
import { List, Panel, Table } from "rsuite";
import { getCompliancePieChartData } from "../../utils";
import { CompliancyGraphs } from "./compliancyGraphs";
import { CompliancyTable } from "./compliancyTable";


type CompliancyProps = {
    data: Compliant;
};

export function Compliancy(props: CompliancyProps) {
    const { data } = props;
    const { isCompliant, details } = data;

    return (
        <div className="space-y-4 py-4">
            <p className="text-2xl text-center">Compliancy status: {isCompliant ? 'Compliant' : 'Non Compliant'}</p>
            <div className="flex h-500">
                <CompliancyGraphs compliancy={data}/>
            </div>
            <div>
                <Panel header="Details" collapsible bordered>
                    <div>
                        <div className="space-x-3">
                            <p className="text-base text-center underline underline-offset-4">
                                Definitions
                            </p>
                            <div>
                                <List>
                                    <List.Item>7 Day: {details["7 day"].message}</List.Item>
                                    <List.Item>24 Hour: {details["24 hour"].message}</List.Item>
                                    <List.Item>11 Hour: {details["11 hour"].message}</List.Item>
                                </List>
                            </div>
                        </div>
                        <div>
                            <CompliancyTable compliancy={data}/>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    )
}