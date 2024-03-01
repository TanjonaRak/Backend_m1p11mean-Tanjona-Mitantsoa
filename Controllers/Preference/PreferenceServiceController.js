const PreferenceServiceModel = require('../../models/Preference/PreferenceService')

class PreferenceServiceController {

    async CheckPreferenceService(req,res){
        try {
            let state = req.params.state;
            let preference = {...req.body};
            let result =await PreferenceServiceModel.CheckPreference(preference,state);
            res.status(200).send({"data":result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

    async getServicePreferenceCustomer(req,res){
        try {
            // console.log("customer")
            let customer = {...req.body};
            // console.log(" ===>> :: "+customer._id)
            let result = await PreferenceServiceModel.getPreferencesServices(customer,null);
            res.status(200).send({"data":result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }
}

module.exports = new PreferenceServiceController();