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
    },
    updateAllOrders : async(req,res,next)=>{
        try {
            // console.log(req.body.data.length);
            let dataOrder = req.body.data;
            for(let data of dataOrder){
                let dataid = data._id;
                let order_id = data.order_id;
                let invoice_no = data.invoice_no;
                let marketplace = data.marketplace;
                let store_name = data.store_name;
                let validasi1status = data.validasi1status;
                let checkProductAt = data.checkProductAt;
                let errorLog = data.errorLog;
                let pickliststatus = data.pickliststatus;
                let productavailablestatus = data.productavailablestatus;
                let validasi2status = data.validasi2status;
                let updatedAt = new Date(data.updatedAt);
                let validasi1At = new Date(data.validasi1At);
                let validasi1By = data.validasi1By;
                let checkboxstatus = data.checkboxstatus;
                let checkstatusBy = data.checkstatusBy;
                let comment = data.comment;
                let batchAt = data.batchAt == null ? null : new Date(data.batchAt);
                let batchBy = data.batchBy;
                let batchid = data.batchid;
                let completedAt = data.completedAt == null ? null : new Date(data.completedAt);
                let completedBy = data.completedBy;
                let completedStatus = data.completedStatus;
                let validasi2By = data.validasi2By;
                let movement_status = data.movement_status;
                let printedstatus = data.printedstatus;
                let validasi2At = data.validasi2At == null ? null : new Date(data.validasi2At);
                let localServer = true;

                let dataUpdate = {
                    validasi1status,
                    checkProductAt,
                    errorLog,
                    pickliststatus,
                    productavailablestatus,
                    validasi2status,
                    updatedAt,
                    validasi1At,
                    validasi1By,
                    checkboxstatus,
                    checkstatusBy,
                    comment,
                    batchAt,
                    batchBy,
                    batchid,
                    completedAt,
                    completedBy,
                    completedStatus,
                    validasi2By,
                    movement_status,
                    printedstatus,
                    validasi2At,
                    localServer
                };

                console.log(data)
                // console.log(dataUpdate)

                let updateOrder = await allOrders.findOneAndUpdate({$and : [
                    {"order_id" : order_id},
                    {"invoice_no" : invoice_no},
                    {"store_name" : store_name}
                ]},dataUpdate);
            }
            return res.json({
                code : 200,
                message : "Success update data"
            })
        } catch (error) {
            console.log(error)
        }
    }
} 