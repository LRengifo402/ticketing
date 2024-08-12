import { Ticket } from '../ticket';

it('implements Optimistic concurrency control', async () => {
  // Create an instace of a ticket
  const ticket = Ticket.build({
    title: 'My Concert',
    price: 55,
    userId: 'chulo',
  });

  // Save the ticket to the DB
  await ticket.save();

  // Fetch the ticket twice.
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changes to the tickets we fetched
  firstInstance!?.set({ price: 10 });
  secondInstance!?.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save();

  // save the second fetched ticket and expect an error.
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error('Should not reac this point');
});

it('Increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'Music Festival',
    price: 1500,
    userId: 'Chulito',
  });
  await ticket.save();

  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
