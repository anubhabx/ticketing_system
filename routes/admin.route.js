import express from "express";
import {
  getAllTickets,
  updateTicketStatus,
  deleteTicket,
  getStats,
} from "../controller/admin.controller.js";
import adminCheck from "../middleware/admin.middleware.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/tickets", [auth, adminCheck], getAllTickets);

router.patch(
  "/tickets/:id/update-status",
  [auth, adminCheck],
  updateTicketStatus
);

router.delete("/tickets/:id/delete", [auth, adminCheck], deleteTicket);

router.get("/stats", [auth, adminCheck], getStats);

export default router;
