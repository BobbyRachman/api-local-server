var express = require('express');
var allOrdersRouter = express.Router();

const allOrdersControllers = require('../allOrdersControllers/allOrdersControllers');

allOrdersRouter.get('/allOrders',allOrdersControllers.getAllOrders);
allOrdersRouter.get('/singleOrders',allOrdersControllers.singleOrders);
allOrdersRouter.post('/updateOrders',allOrdersControllers.updateAllOrders);


module.exports = allOrdersRouter;