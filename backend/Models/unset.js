import User from './User.js'; // Adjust the import path accordingly

const removeFieldFromAllUsers = async () => {
    try {
        await User.updateMany({}, { $unset: { emailOrPhone: "" } }); // Removes oldField from all documents
        console.log("Field removed from all users.");
    } catch (error) {
        console.error("Error removing field:", error);
    }
};

// Call the function to execute the update
removeFieldFromAllUsers();