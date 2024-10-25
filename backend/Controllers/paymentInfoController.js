import PaymentInfo from '../Models/PaymentInfo.js';

// Create and save new payment info
export const createPaymentInfo = async (req, res) => {
  try {
    // Destructure the body to get individual fields
    const { cardName, accountNumber, expirationDate, cvv, totalAmount } = req.body;

    // Validate that all required fields are present
    if (!accountNumber || !expirationDate || !cvv || !totalAmount) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Create a new PaymentInfo instance using the body data
    const paymentInfo = new PaymentInfo({
      cardName,           // optional
      accountNumber,       // required
      expirationDate,      // required
      cvv,                 // required
      totalAmount          // required
    });

    // Save the paymentInfo to the database
    await paymentInfo.save();
    console.log(res, "respomse ")
    // Return success response
    return res.status(201).json({ message: "Payment information saved successfully", paymentInfo });

  } catch (error) {
    // Return error response if something goes wrong
    return res.status(500).json({ message: "Error saving payment information", error: error.message });
  }
};
