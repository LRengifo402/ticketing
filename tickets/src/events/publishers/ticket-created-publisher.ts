import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@larengifo-ticks/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
