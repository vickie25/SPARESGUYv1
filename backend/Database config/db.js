import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://nanjalayvone:nanjalayvone@cluster0.wwaob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


       

        // await mongoose.connect("mongodb+srv://nanjalayvone:nanjalayvone@cluster0.wwaob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
