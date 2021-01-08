import { ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { Label } from 'ng2-charts';
import { getLineChartOptionsObject } from '../common/utility-functions';

interface EgfrTableData {
  date?: string;
  egfr?: number;
  unit?: string;
  test?: string;
}

interface EgfrData {
  date?: Date;
  value?: number;
}

interface EgfrDataForDisplay {
  test?: string;
  value?: number;
  unit?: string;
  date?: string;
  result?: string;
}

interface EgfrChartData {
  data?: Array<EgfrData>;
  label?: string;  /* Systolic, Diastolic */
  fill?: boolean;  /* false */
}

interface Egfr {
  mostRecentEgfr?: EgfrDataForDisplay;
  tableData?: Array<EgfrTableData>;
  chartData?: Array<ChartDataSets>;
  xAxisLabels?: Array<Label>;
  suggestedMin?: Date;
  suggestedMax?: Date;
  lineChartOptions?: ChartOptions & { annotation: any };
}

const emptyEgfrData: ChartPoint = {};
const emptyEgfrTableData: EgfrTableData[] = [];
const emptyEgfrChartData: ChartDataSets[] = [
  {
    data: [emptyEgfrData],
    fill: false,
    label: 'eGFR'
  }];

const emptyEgfr: Egfr = {
  mostRecentEgfr: {},
  tableData: emptyEgfrTableData,
  chartData: emptyEgfrChartData,
  xAxisLabels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  suggestedMin: new Date('2020-01-01'),
  suggestedMax: new Date('2020-06-30'),
  lineChartOptions: { ...getLineChartOptionsObject(10, 70, new Date('2020-01-01'), new Date('2020-06-30')), annotation: [] }
};

export {
  EgfrTableData,
  EgfrData,
  EgfrChartData,
  Egfr,
  emptyEgfr,
  emptyEgfrChartData,
  emptyEgfrTableData,
  emptyEgfrData
};
