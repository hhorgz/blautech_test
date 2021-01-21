const UsersController = require('./controllers/usuario.controller');

exports.routesConfig = (app) => {
    app.post('/users', [
        UsersController.insert
    ]);

    app.get('/users', [
        UsersController.list
    ]);

    app.get('/users/:userId', [
        UsersController.findById
    ]);

    app.patch('/users/:userId', [
        UsersController.updateById
    ]);

    app.delete('/users/:userId', [
        UsersController.deleteById
    ])
}