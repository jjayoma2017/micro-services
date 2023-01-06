import { Publisher, Subjects, TicketUpdatedEvent } from '@ph-lib/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
