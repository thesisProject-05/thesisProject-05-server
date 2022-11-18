const OwPost = require('../models/ownerPostModel');

module.exports = {
    addPost: (req, res) => {
        OwPost.addPost(req.body, (error, results) => {
            error ? res.status(500).send(error) : res.status(201).json(results);
        })
    },
    getOne: (req, res) => {
        OwPost.getOne(req.params.id, (error, results) => {
            error ? res.status(500).send(error) : res.status(200).json(results);
        })
    },
    getOwnerPosts: (req, res) => {
        OwPost.getOwnerPosts(req.params.id, (error, results) => {
            error ? res.status(500).send(error) : res.status(200).json(results);
        })
    },
    deletePost:(req, res) => {
        OwPost.deletePost(req.params.id, (error, results) => {
            error ? res.status(500).send(error) : res.status(201).json("deleted");
        
        })
     },
     getAllPosts: (req, res) => {
        OwPost.getAllPosts((error, results) => {
            error ? res.status(500).send(error) : res.status(200).json(results);
        })
    },
    updatePost: (req, res) => {
      OwPost.updatePost(req.body, req.params.id, (error, results) => {
            error ? res.status(500).send(error) : res.status(201).json(results);
        })
    },
}