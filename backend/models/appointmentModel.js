// yaha per doctor appointment ka data banarey
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    docId: {
      type: String,
      required: true,
    },

    slotDate: {
      type: String,
      required: true,
    },
    slotTime: {
      type: String,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    docData: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    //   yaha per cancelling the appointment
    cancelled: {
      type: Boolean,
      default: false,
    },
    //   yaha per payment k status
    payment: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { minimize: false },
  {
    timestamps: true,
  }
);

const appointmentModel =
  mongoose.models.Appointments ||
  mongoose.model("Appointments", appointmentSchema);
export default appointmentModel;
