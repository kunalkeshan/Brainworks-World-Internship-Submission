/**
 * Application Routers
 */

// Dependencies
const Router = require('express').Router();
const appController = require('../controllers');

Router.get('/users/all', appController.getAllUsers);

Router.get('/users/search', appController.searchUser);

Router.post('/users/add', appController.addUser);

module.exports = Router;