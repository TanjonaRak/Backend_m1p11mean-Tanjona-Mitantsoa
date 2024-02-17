
const PreferenceModel = require('../../models/Customer/Preferences')

class PreferenceController{

    async CheckPreference(req,res){
        try {
            let state = req.params.state;
            let preference = {...req.body};
            let result =await PreferenceModel.CheckPreference(preference,state);
            res.status(200).send({"data":result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

    async getPreferencesByCustomer(req,res){
        try {
            let Customer = {...req.body};
            let result = await PreferenceModel.getPreferenceByCustomer(null,Customer);
            res.status(200).send({"data":result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

    async getEmployeePreferenceCustomer(req,res){
        try {
            // console.log("customer")
            let customer = {...req.body};
            let result = await PreferenceModel.getPreferencesEmployee(customer,null);
            res.status(200).send({"data":result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

}
module.exports = new PreferenceController();
