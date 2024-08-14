import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('Starting up once again to test deploy!!!... another voice!');
  console.log('Maybe now??');
  console.log('Switch to trunk-based development!');
  console.log('Finally???');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
