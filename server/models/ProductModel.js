const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  product_name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: false,
    default: "",
    maxlength: 50,
  },
  quantity: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  livraisons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Livraison",
      onDelete: "cascade",
    },
  ],
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

productSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.date = ret.date.toISOString().slice(0, 10); // transform the date to "YYYY-MM-DD" format
    return ret;
  },
});

const Product = model("Product", productSchema);
module.exports = Product;
