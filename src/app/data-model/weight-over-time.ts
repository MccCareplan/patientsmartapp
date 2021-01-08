import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Label } from 'ng2-charts';
import { getLineChartOptionsObject } from '../common/utility-functions';

interface WotTableData {
  date?: string;
  value?: number;
  unit?: string;
  test?: string;
}

interface WotData {
  date?: Date;
  value?: number;
}

interface WotDataForDisplay {
  test?: string;
  value?: number;
  unit?: string;
  date?: string;
  result?: string;
}

interface WotChartData {
  data?: Array<WotData>;
  label?: string;  /* Systolic, Diastolic */
  fill?: boolean;  /* false */
}

interface Wot {
  mostRecentWot?: WotDataForDisplay;
  tableData?: Array<WotTableData>;
  chartData?: Array<ChartDataSets>;
  xAxisLabels?: Array<Label>;
  suggestedMin?: Date;
  suggestedMax?: Date;
  lineChartOptions?: ChartOptions & { annotation: any };
}

const emptyWotData: ChartPoint = {};
const emptyWotTableData: WotTableData[] = [];
const emptyWotChartData: ChartDataSets[] = [
  {
    data: [emptyWotData],
    fill: false,
    label: 'eGFR'
  }];

const emptyWot: Wot = {
  mostRecentWot: {},
  tableData: emptyWotTableData,
  chartData: emptyWotChartData,
  xAxisLabels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  suggestedMin: new Date('2020-01-01'),
  suggestedMax: new Date('2020-06-30'),
  lineChartOptions: { ...getLineChartOptionsObject(105, 220, new Date('2020-01-01'), new Date('2020-06-30')), annotation: [] }
};

export {
  WotTableData,
  WotData,
  WotChartData,
  Wot,
  emptyWot,
  emptyWotChartData,
  emptyWotTableData,
  emptyWotData
};
