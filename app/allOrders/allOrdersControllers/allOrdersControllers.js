const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const allOrders = require("../../../schema/allOrder");
const allOrdersModels = require("../allOrdersModels/allOrdersModels");

module.exports = {
    getAllOrders : async(req,res,next)=>{
        try{
            if(req.query.sd == undefined || req.query.ed == undefined || req.query.sd == '' || req.query.ed == ''){
                return res.json({
                    code : 400,
                    success : false,
                    message : "Please insert sd and ed completely"
                })
            } else if(req.query.mp == undefined || req.query.mp == ''){
                return res.json({
                    code : 400,
                    success : false,
                    message : "Please insert mp"
                })
            } else if (req.query.brand == undefined || req.query.brand == ''){
                return res.json({
                    code : 400,
                    success : false,
                    message : "Please insert brand"
                })
            } else {
                let sd = new Date(req.query.sd);
                let ed = new Date(req.query.ed);
                let mp = req.query.mp.toLowerCase();
                let brand = req.query.brand.toUpperCase();
                let offset = req.query.offset == undefined ? 0 : req.query.offset == '' ? 0 : parseInt(req.query.offset);
                let limit = req.query.limit == undefined ? 500 : req.query.limit == '' ? 500 : parseInt(req.query.limit);


                let getData = await allOrdersModels.searchDataAllOrder(sd,ed,mp,brand,offset,limit);
                return res.json({
                    code : 200,
                    success : true,
                    message : "Success get data",
                    data : getData
                })
            }

        } catch(error){
            return res.json({
                code : 500,
                success : true,
                message : "Success get data",
                data : getData
            })  
        }
    },
    singleOrders : async(req,res,next)=>{
        if(req.query.mp == undefined || req.query.mp == ''){
            return res.json({
                code : 400,
                success : false,
                message : "Please insert mp"
            })
        } else if(req.query.brand == undefined || req.query.brand == ''){
            return res.json({
                code : 400,
                success : false,
                message : "Please insert brand"
            })
        } else if(req.query.orderId == undefined || req.query.orderId == ''){
            return res.json({
                code : 400,
                success : false,
                message : "Please insert orderId"
            })
        } else {
            let mp = req.query.mp.toLowerCase();
            let brand = req.query.brand.toUpperCase();
            let orderId = req.query.orderId;

            let getData = await allOrdersModels.searchDataSingleOrder(mp,brand,orderId);
            return res.json({
                code : 200,
                success : true,
                message : "Success get data",
                data : getData
            })
        }
    }
} 