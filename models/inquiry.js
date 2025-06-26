import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true,
    maxlength: 500
  },
  quantity: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    default: 'Pcs'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const inquiryModel = mongoose.model('Inquiry', inquirySchema);;
export default inquiryModel;
