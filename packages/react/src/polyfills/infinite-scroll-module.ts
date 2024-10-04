import { ReactElement } from 'react';
import _InfiniteScroll, { Props } from 'react-infinite-scroll-component';

export const InfiniteScroll = _InfiniteScroll as unknown as (props: Props) => ReactElement;
