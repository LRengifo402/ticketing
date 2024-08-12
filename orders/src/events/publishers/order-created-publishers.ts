import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@larengifo-ticks/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
