/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { MccCodeableConcept } from './MccCodeableConcept';
import { MccDate } from './MccDate';
import { MccDateTime } from './MccDateTime';
import { MccDuration } from './MccDuration';
import { MccId } from './MccId';
import { MccIdentifer } from './MccIdentifer';
import { MccInstant } from './MccInstant';
import { MccPeriod } from './MccPeriod';
import { MccQuantity } from './MccQuantity';
import { MccRange } from './MccRange';
import { MccRatio } from './MccRatio';
import { MccSampledData } from './MccSampledData';
import { MccTime } from './MccTime';
import { MccTiming } from './MccTiming';

export interface GenericType {
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
}
