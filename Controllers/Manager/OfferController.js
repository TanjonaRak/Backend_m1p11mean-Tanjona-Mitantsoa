const OfferModel = require("../../models/Manager/Offer");

class OfferController{

    async SaveOffer(req,res){
        try {
            let offer = {...req.body}
            const newOffer =await OfferModel.SaveOffer(offer);
            res.send({"data":newOffer,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

    async getOffer(req,res){
        try {
            let offset = req.params._offset;
            let limit =req.params._limit;
            let offer = {...req.body}
            let result = await OfferModel.getOffer(offer,offset,limit);
            console.log(result)
            res.send({"data":result.result,"lineNumber":result.lineNumber,"message":"request with success",status:200});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }


}
module.exports = new OfferController();