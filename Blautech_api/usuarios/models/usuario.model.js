const { mongoose } = require("../../common/services/mongoose.service");
const { firestoredb } = require("../../common/services/firestore.service");
const { Schema } = require("mongoose");

// Definicion del modelo de Usuario
const usuarioSchema = new Schema({
    nombre: String,
    edad: Number
});

// id autogenerado
usuarioSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// incluir el id dentro del modelo usuario
usuarioSchema.set('toJSON', {
    virtuals: true
});

usuarioSchema.findById = (cb) => {
    return this.model('Usuario').find({id: this.id}, cb);
}

// objeto para al consumo del servicio de MongoDB
const Usuario = mongoose.model('Usuario', usuarioSchema);
// catalogo de FireStore
const UsuarioFsCatalog = firestoredb.collection('usuarios');

exports.findById = (id) => {
    return Usuario.findById(id)
        .then(result => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        }).catch(err => {
            return {
                error: "User not found"
            }
        });
}

exports.createUser = userData => {
    // se crea objeto de tipo Usuario con el JSON recibido en userData
    // el id es autogenerado
    const user = new Usuario(userData);

    // insert en FireStore
    let userFs = UsuarioFsCatalog.doc(user.id);
    userFs.set(userData);

    // insert en MongoDB
    return user.save();
}

exports.list = () => {
    return new Promise((resolve, reject) => {
        Usuario.find()
        .exec((err, users) => {
            if(err) {
                reject(err);
            } else {
                resolve(users);
            }
        });
    });
}

exports.modify = (id, userData) => {
    let userDocument = UsuarioFsCatalog.doc(id);
    userDocument.update(userData);

    return Usuario.findOneAndUpdate({
        _id: id
    }, userData)
        .catch(err => {
            return {
                error: "User not found"
            }
        });
}

exports.delete = (id) => {
    let userDocument = UsuarioFsCatalog.doc(id);
    userDocument.delete();

    return Usuario.findOneAndDelete({
        _id: id
    }).catch(err => {
        return {
            error: "User not found"
        }
    });
}