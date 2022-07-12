import { compose, filter, isNil, mergeDeepRight, not, pipe, reduce, unapply } from 'ramda';
export const merge = unapply(pipe(filter(compose(not, isNil)), reduce(mergeDeepRight, {})));
