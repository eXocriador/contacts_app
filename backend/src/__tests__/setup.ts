import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Global test setup
beforeAll(async () => {
  // Connect to test database
  const testDbUri =
    process.env.MONGODB_TEST_URI ||
    'mongodb://localhost:27017/contacts_app_test';
  await mongoose.connect(testDbUri);
});

// Global test teardown
afterAll(async () => {
  await mongoose.connection.close();
});

// Clean up database between tests
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
