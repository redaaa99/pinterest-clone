const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const Image = require('mongoose').model('Image');
const validator = require('validator');
const config = require('../../config');
var Magic = require('mmmagic').Magic;
var magic = new Magic();

function validateImageForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.url !== 'string' || !validator.isURL(payload.url)) {
    magic.detectFile(payload.url, function(err, result) {
        if (err) {errors.url = 'Please provide a correct image url';}
    });
    isFormValid = false;
    errors.url = 'Please provide a correct image url';
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Description must have at least 8 characters.';
  }

  if (!payload || typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide an image title.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.get('/dashboard', (req, res) => {
  jwt.verify(req.headers.authorization.split(" ")[1], config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;
    User.findById(userId,function(err,user){
      Image.find({owner: user.name},function(err,images){
        if (err) { return res.status(401).end(); }
        for(var i=0;i<images.length;i++)
        {
          images[i].owner=user.name;
        }
        res.status(200).json({
          images: images,
          profile : true
        });
      });
    });

  });
});


router.post('/like/:id', (req, res) => {
  jwt.verify(req.headers.authorization.split(" ")[1], config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }
    const userId = decoded.sub;
    User.findById(userId,function(err,user){
      if (err) { return res.status(401).end(); }
      Image.findById(req.params.id,function(err,image){
        if(image.likes.indexOf(user.name)>=0){
          Image.findOneAndUpdate({_id: req.params.id}, {$pull: { likes: user.name}}, {new: true}, function(err, newImage) {
            if (err) { return res.status(401).end(); }
            return res.status(200).json({message : newImage.likes, user: user.name});
          });
        }
        else {
          Image.findOneAndUpdate({_id: req.params.id}, {$addToSet: { likes: user.name }}, {new: true}, function(err, newImage) {
            if (err) { return res.status(401).end(); }
            return res.status(200).json({message : newImage.likes, user: user.name});
          });
        }
      });
    })

  });
});

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


router.delete('/image/:id', (req, res) => {
  jwt.verify(req.headers.authorization.split(" ")[1], config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }
    const userId = decoded.sub;
    Image.findById(req.params.id,function(err,image){
      if (err) { return res.status(401).end(); }
      User.findById(userId,function(err,user){
        if (err) { return res.status(401).end(); }
        if(image.owner===user.name){
          Image.find({ _id:req.params.id }).remove(function(err){
            if (err) { return res.status(401).end(); }
            return res.status(200).json({message : "success"});
          });
        }else {
          return res.status(400).json({message : "Not your Image"});
        }
      })

    });
  });
});



router.post('/image', (req, res) => {
  jwt.verify(req.headers.authorization.split(" ")[1], config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const validationResult = validateImageForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    const userId = decoded.sub;

    User.findById(userId,function(err,user){
      const image = new Image({
        owner: user.name,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        likes:[]
      });
      image.save(function (err) {
        if (err) { return res.status(401).end(); }
        res.status(200).json({message : "sucess"});
      })
    })



  });
});

module.exports = router;
