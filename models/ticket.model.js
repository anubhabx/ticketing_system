import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["open", "in progress", "resolved"],
    default: "open",
    set: (v) => v.toLowerCase(),
  },
  comments: [
    {
      text: String,
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
