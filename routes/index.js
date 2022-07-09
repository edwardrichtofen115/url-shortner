const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route   GET /:code
// @desc    route the code url to the long/original URL

router.get('/', (req, res) => {
	res.redirect('/api-docs');
});

router.get('/:code', async (req, res) => {
	try {
		const url = await Url.findOne({ urlCode: req.params.code });
		if (url) {
			//redirec to the long url

			res.redirect(url.longUrl);
		} else {
			//send message saying this route does not exist
			return res.status(404).json('No url found');
		}
	} catch (error) {
		return res.status(500).json('Server problem');
	}
});

module.exports = router;
