import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@larengifo-ticks/common';

export class TicketUPdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
