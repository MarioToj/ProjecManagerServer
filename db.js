import mongoose from 'mongoose';

const db = 'mongodb+srv://mario:notasdemario@notesapp.0codsfb.mongodb.net/test'

export const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false)
        const conn = await mongoose.connect(db)
    
        console.log(`Mongo connected: ${ conn.connection.name }`);
    } catch {
        console.error(`Error: ${ error.message }`);

        process.exit(1)
    }
}