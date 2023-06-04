const { Schema, model } = require("mongoose");

const commandeSchema = new Schema({
  serie_bc: {
    type: String,
    required: [true, "Série BC is required"],
    unique: true,
  },
  designation: {
    type: String,
    required: [true, "designation is required"],
  },
  quantity: {
    type: String,
    required: [true, "quantity is required"],
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Commande = model("Commande", commandeSchema);
module.exports = Commande;
