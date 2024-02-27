const ServiceModel = require('../../models/Service/Service');

class ServiceController {

    async RegisterService (req,res){
        
        const cust = {...req.body}

       var status = await ServiceModel.SaveService(cust);
       console.log(status);
       if(status){
            res.send({"status":true, "message": "Service created successfuly"});
       }
       else{
            res.send({"status":false, "message": "Error creating service"});
       }
    }

    async getDataService (req,res){
        try {
            const service = await ServiceModel.getService();
            res.send({ "status": true, "data":service});
        } catch (error) {
            res.status(500).send("error");
        }
       
    }
}

module.exports = new ServiceController();