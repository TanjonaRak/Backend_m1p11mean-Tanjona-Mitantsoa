
const PreferenceEmployeeModel = require('../../models/Preference/PreferenceEmployee')

class PreferenceEmployeeController {

    async CheckPreferenceEmployee(req,res){
        try {
            let state = req.params.state;
            let preference = {...req.body};
            let result =await PreferenceEmployeeModel.CheckPreference(preference,state);
            res.status(200).send({"data":result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

    async getEmployeePreferenceCustomer(req,res){
        try {
            // console.log("customer")
            let customer = {...req.body};
            // console.log(" ===>> :: "+customer._id)
            let result = await PreferenceEmployeeModel.getPreferencesEmployee(customer,null);
            res.status(200).send({"data":result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }
    async getEmployeePreferenceCustomerFavoris(req,res){
        try {
            // console.log("customer")
            let customer = {...req.body};
            // console.log(" ===>> :: "+customer._id)
            let result = await PreferenceEmployeeModel.getPreferencesEmployeeFavoris(customer,null);
            res.status(200).send({"data":result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }
}

module.exports = new PreferenceEmployeeController();