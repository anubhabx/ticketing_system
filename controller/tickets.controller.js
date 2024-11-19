import Ticket from "../models/ticket.model.js";

export const createTicket = async (req, res) => {
  try {
    const ticketData = {
      ...req.body,
      user_id: req.user.id,
      status: (req.body.status || 'open').toLowerCase()
    };

    const ticket = new Ticket(ticketData);
    await ticket.save();

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('user_id', 'username');

    res.json(populatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user_id: req.user.id });
    res.json(tickets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addUserComment = async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const ticket = await Ticket.findOne({ _id: req.params.id });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const comment = {
      user_id: req.user.id,
      text: req.body.text,
      created_at: new Date()
    };

    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: comment } },
      { 
        new: true,
        runValidators: true
      }
    )
    .populate('user_id', 'username')
    .populate('comments.user_id', 'username');

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized - Admin access required" });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
