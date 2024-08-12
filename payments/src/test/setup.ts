import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51PmYxo2MhElWmui2w7X3wIQEOcv9r0Rjb57Rwm2Im7pS56MqvR4DDy07z9HKbKt99HZlMvOr5GRgf9sGOW5kFBkT00EumLfIqE';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const email = 'test@test.com';
  const password = 'password';

  const response = request(app);
  // Build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'chulo@chulo.com',
  };
  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build sessions Object. {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that sessions in JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string that's the cookie with the encoded data.
  return [`session=${base64}`];
};
