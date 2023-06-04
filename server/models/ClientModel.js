const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  client_name: {
    type: String,
    required: [true, "client name of company is required"],
  },
  matricule: {
    type: String,
    required: [true, "matricule is required"],
  },
  volume: {
    type: String,
    required: [true, "volume is required"],
  },
  commandes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Commande",
      onDelete: "cascade",
    },
  ],
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

const Client = model("Client", clientSchema);
module.exports = Client;
