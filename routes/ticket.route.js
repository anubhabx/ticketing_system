import { Router } from "express";
import {
  createTicket,
  getMyTickets,
  deleteTicket,
  addUserComment,
} from "../controller/tickets.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = Router();

router.post("/create-ticket", auth, createTicket);

router.get("/my-tickets", auth, getMyTickets);

router.post("/:id/comment", auth, addUserComment);

router.delete("/:id", auth, deleteTicket);

export default router;
