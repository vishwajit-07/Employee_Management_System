import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    lastCompany: {
      type: String,
      required: true,
    },
    resignationDate: {
      type: Date,
      default: null, // Allows null if the employee hasn't resigned
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 Add this

    history: [
      {
        field: { type: String, required: true },
        oldValue: { type: mongoose.Schema.Types.Mixed, required: true },
        newValue: { type: mongoose.Schema.Types.Mixed, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

export const Employee = mongoose.model("Employee", EmployeeSchema);
