var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catchphrase_app");

var catchPhraseSchema = new mongoose.Schema({
	word: {
		type: String,
		default: ""
	},
	definition: {
		type: String,
		default: ""
	}
});

var Catchphrase = mongoose.model("Catchphrase", catchPhraseSchema);

module.exports.Catchphrase = Catchphrase;