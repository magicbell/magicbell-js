import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import useInterval from 'react-use/lib/useInterval';

import { toDate } from '../../lib/date';
import Tooltip, { TooltipProps } from '../Tooltip/Tooltip';

export interface Props {
  date: Dayjs | Date | number | string;
  tooltipPlacement?: TooltipProps['placement'];
}

/**
 * Component to render a date or timestamp as relative time.
 *
 * @example
 * <Timestamp date={new Date()} />
 */
export default function Timestamp({ date, tooltipPlacement = 'bottom-end' }: Props) {
  const [dateObj] = useState(() => toDate(date));
  const [relativeTime, setRelativeTime] = useState(dateObj.fromNow(true));

  useInterval(() => setRelativeTime(dateObj.fromNow(true)), 60_000);

  return (
    <Tooltip tooltip={dateObj.format('LL LT')} placement={tooltipPlacement}>
      <div>{relativeTime}</div>
    </Tooltip>
  );
}
