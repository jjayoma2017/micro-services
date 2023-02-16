import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('returns an error if one user tries to fetch another users order', async () => {
  // create ticket
  const ticket = Ticket.build({
    title: 'conert',
    price: 20,
  });
  await ticket.save();

  const user = global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  // Make a request to fetch an error
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});

it('fetches an order', async () => {
  // create ticket
  const ticket = Ticket.build({
    title: 'conert',
    price: 20,
  });
  await ticket.save();

  const user = global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  // Make a request to fetch an error
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});
