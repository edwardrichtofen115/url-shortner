const express = require('express');
const router = express.Router();

const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');
const Url = require('../models/Url');




// @route    POST  /api/url/shorten
// @desc     Create the short version of URL

router.post('/shorten', async (req,res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL');

    // Check base URL
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url');
    }

    // Create url code
    const urlCode = shortId.generate();

    //Check long url
    if(!validUrl.isUri(longUrl)){
        return res.status(401).json('Invalid url passed');
    }else{
        // check if long url already exists in database
        try {
            let url = await Url.findOne({longUrl});

            if(url){
                
                return res.json(url);
            }else{
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                return res.status(200).json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server error')
        }
    }

})

// @route    DELETE  /api/url/delete
// @desc     Delete the short version of url saved in DB
router.delete('/delete', async (req,res) => {
    const {longUrl} = req.body;

    const url = await Url.findOne({longUrl: longUrl});

    if(url){
        url.delete();
        return res.status(200).json(`${longUrl} has been deleted`);

    }else{
        return res.status(404).json(`Cannot delete ${longUrl} as it does not exist`);
    }

    
})


// @route    GET  /api/url/getUrl
// @desc     Get the short version of url saved in DB
router.get('/getUrl', async(req, res) => {
    const {longUrl} = req.body;

    const url = await Url.findOne({longUrl: longUrl});

    if(url){
        return res.status(200).json(url.shortUrl);
    }else{
        return res.status(404).json('Specified URL does not exist');
    }
})

module.exports = router;