import { useState, useEffect } from 'react';
import DateRangePicker, { DateRange, ValueType } from 'rsuite/DateRangePicker';
import { Compliancy, Daily, Tabs, Weekly} from './components';
import { Compliancy as Compliant, DailyDriverTableData, WeeklyDriverData } from '@/types';
import { formatDate } from './utils';

export default function Home() {
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());
  const [data, setData] = useState({} as {
      daily: DailyDriverTableData[],
      weekly: WeeklyDriverData[],
      compliancy: Compliant,
  });
  const {daily, weekly, compliancy} = data;

  const fetchDriverData = async () => {
      const res = await fetch(`http://localhost:3000/api/driver?start=${formatDate(startDay)}&end=${formatDate(endDay)}`);
      const data = await res.json();
      setData(data);
  }
  const onCalendarChange = (value: DateRange | null) => {
      if(value != null){
          setStartDay(value[0]);
          setEndDay(value[1]);    
      }
  }
  useEffect(() => {
      fetchDriverData();
  }, [startDay, endDay]);

  return (
    <>
      <main className="space-y-4">
        <div className=" flex content-center">
          <h1 className="text-3xl">Your Driver Data</h1>
        </div>
        <div className="text-xl">Name: John Smith</div>

        <div>From {startDay.toDateString()} - {endDay.toDateString()}</div>
        <div>
          <DateRangePicker appearance="default" placeholder="Default" style={{ width: 230 }} onChange={(value: DateRange | null, event: SyntheticEvent<Element, Event>) => onCalendarChange(value)}/>
        </div>

        <Tabs>
          <div label="Daily">
            <Daily data={daily} />
          </div>
          <div label="Weekly">
            <Weekly data={weekly} />
          </div>
          <div label="Compliancy">
            <Compliancy data={compliancy} />
          </div>
        </Tabs>
      </main>
    </>
  )
}
