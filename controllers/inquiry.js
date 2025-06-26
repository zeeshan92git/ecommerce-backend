import inquiryModel from "../models/inquiry.js";

export const sendInquiry = async (req, res) => {
  try {
    const { item, details, quantity, unit } = req.body;
    const userId = req.user?.userId || null; // if using auth

    if (!item || !details || !quantity || !unit) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newInquiry = new inquiryModel({
      item,
      details,
      quantity,
      unit,
      userId
    });

    await newInquiry.save();

    return res.status(200).json({ success: true, message: 'Inquiry sent successfully' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
