

const historiqueScanModel = require("../models/HistoriqueScan");
// const Reservation = require("../models/HistoriqueScan");

class HistoriqueScanController {

    async AddHistorique (req,res){
        try {
            const id  = req.params._id;
            const etat = req.params._etat
            const newhisto = {...req.body}
            const histoRes = await historiqueScanModel.ScanSucccess(newhisto,id,etat);
            res.status(200).send({histoRes,status:200});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }
    }



    async getHisto (req,res){
        try {
          
            const rest = await historiqueScanModel.get();
            res.status(200).send(rest);
        } catch (error) {
            res.status(500).send({message:error.message})
        }
    }



}

module.exports = new HistoriqueScanController();