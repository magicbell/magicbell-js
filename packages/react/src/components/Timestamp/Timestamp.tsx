import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import { toDate } from '../../lib/date.js';
import Tooltip, { TooltipProps } from '../Tooltip/Tooltip.js';

export interface Props {
  date: Dayjs | Date | number | string;
  tooltipPlacement?: TooltipProps['placement'];
  delay?: TooltipProps['delay'];
}

/**
 * Component to render a date or timestamp as relative time.
 *
 * @example
 * <Timestamp date={new Date()} />
 */
export default function Timestamp({ date, tooltipPlacement = 'bottom-end', delay = 250 }: Props) {
  const [dateObj] = useState(() => toDate(date));
  const [relativeTime, setRelativeTime] = useState(dateObj.fromNow(true));

  useEffect(() => {
    const fn = () => setRelativeTime(toDate(date).fromNow(true));
    const interval = setInterval(fn, 60_000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <Tooltip tooltip={dateObj.format('LL LT')} placement={tooltipPlacement} delay={delay}>
      <div>{relativeTime}</div>
    </Tooltip>
  );
}
