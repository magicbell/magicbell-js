import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import useInterval from 'react-use/lib/useInterval';
import { toDate } from '../../lib/date';
import Popover, { PopoverPlacement } from '../Popover';
import TimestampTooltip from './TimestampTooltip';

export interface Props {
  date: Dayjs | Date | number | string;
  tooltipPlacement?: PopoverPlacement;
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
    <Popover launcher={<div>{relativeTime}</div>} placement={tooltipPlacement}>
      {() => <TimestampTooltip date={dateObj} />}
    </Popover>
  );
}
