const Customer = require('../../models/Customer/Customer');
const CustomerModel = require('../../models/Customer/Customer');
const db = require('../../Utility/db');
 
                          
class CustomerController {

 
    async RegisterCustomer (req,res){
        
        const cust = {...req.body}

       var status = await CustomerModel.SaveCustomer(cust);
       console.log(status);
       if(status){
            res.send({"status":true, "message": "Customer created successfuly"});
       }
       else{
            res.send({"status":false, "message": "Error creating customer"});
       }
    }

    async getDataCustomer (req,res){
        try {
            const customer = await CustomerModel.getCustomer();
            res.send({ "status": true, "data":customer});
        } catch (error) {
            res.status(500).send("error");
        }
       
    }
    
    async loginProcessing(req, res) {
        var email = req.params.email;
        var password = req.params.password;
        let customerArray = await CustomerModel.getLoginProcessing(email,password);
        if(customerArray!=null){
          res.send({"status":true, "message": "Precessing successfuly"});
          return 0; 
        }
        else{
          res.send({"status":false, "message": "Processing Error"});
          return 1; 
        }
    }

}
module.exports = new CustomerController();