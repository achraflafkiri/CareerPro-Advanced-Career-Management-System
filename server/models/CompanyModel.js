const { Schema, model } = require("mongoose");
const validator = require("validator");

const companySchema = new Schema(
  {
    company_name: {
      type: String,
      required: [true, "Name of company is required"],
      unique: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^(\+212|0)(\d{9}|\d{2}\s\d{8})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        onDelete: "cascade",
      },
    ],
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        onDelete: "cascade",
      },
    ],
    materials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Material",
        onDelete: "cascade",
      },
    ],
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
        onDelete: "cascade",
      },
    ],
    commandes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Commande",
        onDelete: "cascade",
      },
    ],
    livraisons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Livraison",
        onDelete: "cascade",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = model("Company", companySchema);
module.exports = Company;
