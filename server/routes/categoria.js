const express = require('express')
const _ = require('underscore')
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion')
const app = express()
const Categoria = require('../models/categoria')

//Mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({}, '_id descripcion usuario')
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Categoria.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    registrosTotales: conteo,
                    categorias
                })
            })
        })
})

//categoria en particular
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe la categoria'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })

})

//Crear categoria
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

//Actualiza categoria
app.put('/categoria/:id', verificaToken, (req, res) => {
    let body = _.pick(req.body, ['descripcion'])
    let id = req.params.id

    Categoria.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query'
    }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

//Elimina categoria
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    let id = req.params.id

    Categoria.findByIdAndDelete(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (categoriaBorrada == null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada
        })
    })
})


module.exports = app