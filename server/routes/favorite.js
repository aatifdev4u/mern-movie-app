const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", auth, (req, res) => {
   Favorite.find({movieId: req.body.movieId})
    .exec((err, subscribe)=>{
        if(err) res.status(400).send(err);

        res.status(200).json({ success: true, subscriberNumber: subscribe.length})
    })
});


router.post("/favorited", auth, (req, res) => {
   Favorite.find({
        movieId: req.body.movieId,
        userFrom: req.body.userFrom
    }).exec((err, subscribe)=>{
        if(err) res.status(400).send(err);
        let result = false;

        if(subscribe.length !== 0){
            result = true;
        }

        res.status(200).json({
            success: true,
            subscribed: result
        })

    })
});

router.post("/addToFavorite", auth, (req, res) => {
   const newFavorite = new Favorite(req.body);
   newFavorite.save((err, doc)=>{
       if(err) res.status(400).send(err);
       return res.status(200).json({ success: true})
    })
   });

   router.post("/removeFromFavorite", auth, (req, res) => {
        Favorite.findOneAndDelete({
            movieId: req.body.movieId,
            userFrom: req.body.userFrom
        }).exec((err, doc)=>{
            if(err) res.status(400).send(err);
            return res.status(200).json({ success: true, doc})
        })
    });

    // getFavoriteMovie
    router.post("/getFavoriteMovie", auth, (req, res) => {
        Favorite.find({
            userFrom: req.body.userFrom
        }).exec((err, favorites)=>{
            if(err) res.status(400).send(err);
            return res.status(200).json({ success: true, favorites})
        })
    });
 

module.exports = router;
