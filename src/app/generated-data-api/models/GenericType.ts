/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MccCodeableConcept } from './MccCodeableConcept';
import type { MccCoding } from './MccCoding';
import type { MccDate } from './MccDate';
import type { MccDateTime } from './MccDateTime';
import type { MccDuration } from './MccDuration';
import type { MccId } from './MccId';
import type { MccIdentifer } from './MccIdentifer';
import type { MccInstant } from './MccInstant';
import type { MccPeriod } from './MccPeriod';
import type { MccQuantity } from './MccQuantity';
import type { MccRange } from './MccRange';
import type { MccRatio } from './MccRatio';
import type { MccSampledData } from './MccSampledData';
import type { MccTime } from './MccTime';
import type { MccTiming } from './MccTiming';

export type GenericType = {
    valueType: string;
    stringValue?: string;
    integerValue?: number;
    booleanValue?: boolean;
    idValue?: MccId;
    codeableConceptValue?: MccCodeableConcept;
    quantityValue?: MccQuantity;
    rangeValue?: MccRange;
    ratioValue?: MccRatio;
    periodValue?: MccPeriod;
    dateValue?: MccDate;
    timeValue?: MccTime;
    dateTimeValue?: MccDateTime;
    sampledDataValue?: MccSampledData;
    durationValue?: MccDuration;
    timingValue?: MccTiming;
    instantValue?: MccInstant;
    identiferValue?: MccIdentifer;
    codingValue?: MccCoding;
    decimalValue?: number;
}
