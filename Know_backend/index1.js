// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
	dbName: 'Ayush',
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) :
	console.log('Connected to Ayush database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
	isap:{
		type: Boolean,
	},
	rat:{
		type: String,
		required: true
	},
	dom:{
		type: String,
		required: true
	},
	file: {
		type: Buffer,
		required: true
	}
});
const User = mongoose.model('Approvals', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 2001");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.listen(2001);
