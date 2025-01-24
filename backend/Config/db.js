import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://apbcafricait:apbcafricait@cluster0.tlkh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


        // await mongoose.connect("mongodb+srv://nanjalayvone:nanjalayvone@cluster0.wwaob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("MongoDB connected.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }

    // Access the Google Client ID from environment variables
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!googleClientId) {
        console.error("REACT_APP_GOOGLE_CLIENT_ID is not defined.");
        process.exit(1);
    }
};

export default connectDB;

