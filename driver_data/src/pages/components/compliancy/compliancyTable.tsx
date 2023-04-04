import { getCompliancyTableData } from '@/pages/utils/data_parser';
import { Compliant } from '@/types';
import { Table, Tooltip } from 'rsuite';

type CompliancyTableProps = {
  compliancy: Compliant;
};

export function CompliancyTable(props: CompliancyTableProps){
    const { compliancy } = props;
    const { Column, HeaderCell, Cell } = Table;
    const tableData = getCompliancyTableData(compliancy);
    return (
    <Table
        height={400}
        data={tableData}
      >
        <Column flexGrow={1}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>
  
        <Column flexGrow={1}>
          <HeaderCell>Week/Day</HeaderCell>
          <Cell dataKey="date" />
        </Column>
  
        <Column flexGrow={1}>
          <HeaderCell>Compliant</HeaderCell>
          <Cell dataKey="isCompliant" />
        </Column>
    </Table>
      )
}