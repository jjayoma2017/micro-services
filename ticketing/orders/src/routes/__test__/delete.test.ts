import request from 'supertest';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('marks an order as cancelled', async () => {
  // create a ticket  with Ticket model
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  ticket.save();
  // make a request to create an order
  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);
  // expectation to make sure the order was cancelled
  const cancelledOrder = await Order.findById(order.id);
  expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo('Emit an order cancelled event');
