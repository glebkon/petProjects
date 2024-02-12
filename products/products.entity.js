const mongoose = require("mongoose");
/*
Define Schema for Products with following fields with type and validation criteria as specified in the format:
[Field :: Type :: Validation Criteria]

ProductId :: String :: Mandatory and Unique, 
ProductName :: String :: Mandatory, 
Description :: String :: Mandatory with Default Value 0, 
Price :: Number :: Mandatory with Default Value 0, 
UnitsAvailable :: Number :: Mandatory with Default Value 0,
Tags :: Array :: Mandatory, 
Category :: String :: Mandatory, 
Metadata :: Object 
UpdatedOn :: Date :: Mandatory with Default Value Current Date, 
UpdatedBy :: String :: Mandatory
*/

const schema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: { type: String, required: true },
  description: { type: String, required: true, default: "" },
  price: { type: Number, required: true, default: 0 },
  unitsAvailable: { type: Number, required: true, default: 0 },
  tags: { type: Array, required: true },
  category: { type: String, required: true },
  metadata: { type: Object },
  updatedOn: { type: Date, required: true, default: Date.now },
  updatedBy: { type: String, required: true},
});

module.exports = mongoose.model("products", schema);
