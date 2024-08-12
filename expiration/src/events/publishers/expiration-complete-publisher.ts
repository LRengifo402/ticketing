import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@larengifo-ticks/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
