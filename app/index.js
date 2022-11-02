const Router = require('express').Router()
const allOrdersRouter = require('./allOrders/allOrdersRouters/allOrdersRouters');

Router.use('/getOrders',allOrdersRouter);

module.exports = Router