var express = require('express');
var allOrdersRouter = express.Router();

const allOrdersControllers = require('../allOrdersControllers/allOrdersControllers');

allOrdersRouter.get('/allOrders',allOrdersControllers.getAllOrders);
allOrdersRouter.get('/singleOrders',allOrdersControllers.singleOrders);


module.exports = allOrdersRouter;