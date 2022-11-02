const allOrder = require('../../../schema/allOrder');

module.exports = {
    searchDataAllOrder : async(sd,ed,mp,brand,offset,limit)=>{
        let getData = await allOrder.aggregate([
            {$match : {
                $and : [
                    {"create_date" : {$gte : sd}},
                    {"create_date" : {$lte : ed}},
                    {"marketplace" : mp},
                    {"store_name" : brand}
                ]
            }},
            {$skip : offset},
            {$limit : limit}
        ])

        return getData;
    },
    searchDataSingleOrder : async(mp,brand,orderId)=>{
        let getData = await allOrder.aggregate([
            {$match : {
                $and : [
                    {"marketplace" : mp},
                    {"store_name" : brand},
                    {"order_id" : orderId}
                ]
            }}
        ]);

        return getData
    }
}