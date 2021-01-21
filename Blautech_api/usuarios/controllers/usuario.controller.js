const UsuarioModel = require('../models/usuario.model');

exports.insert = (req, res) => {
    UsuarioModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id})
        })
}

exports.list = (req, res) => {
    UsuarioModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
}

exports.findById = (req, res) => {
    UsuarioModel.findById(req.params.userId)
        .then( result => {
            res.status(200).send(result);
        })
}

exports.updateById = (req, res) => {
    UsuarioModel.modify(req.params.userId, req.body)
        .then(result => {
            res.status(204).send(result);
        })
}

exports.deleteById = (req, res) => {
    UsuarioModel.delete(req.params.userId)
        .then(result => {
            res.status(204).send(result);
        })
}