// MongoDB initialization script
db = db.getSiblingDB('contacts_app');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        },
        password: {
          bsonType: 'string',
          minLength: 6,
        },
      },
    },
  },
});

db.createCollection('contacts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'owner'],
      properties: {
        name: {
          bsonType: 'string',
          minLength: 1,
        },
        owner: {
          bsonType: 'objectId',
        },
      },
    },
  },
});

db.createCollection('sessions');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.contacts.createIndex({ owner: 1 });
db.contacts.createIndex({ name: 1 });
db.sessions.createIndex({ userId: 1 });
db.sessions.createIndex({ refreshToken: 1 }, { unique: true });

print('MongoDB initialization completed successfully!');
