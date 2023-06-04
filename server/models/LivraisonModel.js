const { Schema, model } = require("mongoose");

const livraisonSchema = new Schema({
  designation: {
    type: String,
    required: [true, "designation is required"],
  },
  quantity: {
    type: Number,
    required: false,
    default: 0,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  serie_bc: {
    type: String,
    ref: "Commande",
    unique: true,
  },
});

const livraison = model("Livraison", livraisonSchema);
module.exports = livraison;
