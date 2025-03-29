const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyNumber: { type: String, required: true, unique: true, trim: true },
  policyStartDate: { type: Date, required: true },
  policyEndDate: { type: Date, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  premiumAmount: { type: Number, required: true },
  policyType: { type: String, required: true },
  producer: { type: String, required: true, trim: true },
  csr: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);