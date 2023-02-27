import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const connectDb = async () => {
    
    try {
        dotenv.config()
        await mongoose.connect(process.env.MONGO_URL);
        console.log('db_online')
    } catch (error) {
        console.log('Error initializing DB')
    }
}