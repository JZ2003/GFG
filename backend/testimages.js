require('dotenv/config');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
		console.log('connected')
	});

async function testImages() {
    var imgModel = require('./models');
    imgModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
		}
		else {
            for (let i = 0; i < items.length; i++) {
                console.log(items[i].name);
            }
		}
	});
}


testImages().catch(console.error);