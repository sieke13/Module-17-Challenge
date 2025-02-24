import mongoose from 'mongoose';
import connection from '../config/connection';
import { User, Thought } from '../models';
const seedDatabase = async () => {
    await connection;
    console.log('Database connected');
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Existing data cleared');
    // Seed users
    const users = [
        {
            username: 'user1',
            email: 'user1@example.com',
        },
        {
            username: 'user2',
            email: 'user2@example.com',
        },
    ];
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded');
    // Seed thoughts
    const thoughts = [
        {
            thoughtText: 'This is a thought from user1',
            username: createdUsers[0].username,
        },
        {
            thoughtText: 'This is a thought from user2',
            username: createdUsers[1].username,
        },
    ];
    await Thought.insertMany(thoughts);
    console.log('Thoughts seeded');
    mongoose.connection.close();
    console.log('Database connection closed');
};
seedDatabase().catch((err) => {
    console.error(err);
    mongoose.connection.close();
});
