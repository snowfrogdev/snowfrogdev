import { UnleashContext } from './internal';

export type ImpressionEventType = 'isEnabled' | 'getVariant';
export type ImpressionEvent<T extends ImpressionEventType> = {
  eventType: T;
  eventId: string;
  context: UnleashContext;
  enabled: boolean;
  featureName: string;
  variant: T extends 'getVariant' ? string : never;
};
