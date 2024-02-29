const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
const bcrypt = require('bcrypt');


class Customer {
     
    customer = new Schema({
       // _id: { type: String, required: true },
        name : {type:String,required : true},
        first_name : {type:String,required : true},
        password : {type:String, required : true},
        email : {type:String, required : true},
        photo : {type:String, required : true}

    })
     /*
        {
            "name" :"RAKOTO",
            "first_name" : "ROBERT",
            "password" : "LOGIN",
            "email":"tanjona@gmail.com",
            "photo" : "photos1",
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt)

        }
    */

    CustomerModel = mongoose.model('customer',this.customer);
     
  /*  async initialiser (customer){
        const {_id} = await customer.toJSON();
        const token = jwt.sign({_id:_id},"secret")
        customer.cookie("jwt",token,{
            httpOnly:true,
            maxAge:24*60*60*1000
        })
    }*/
    constructor (){
      //  this.initialiser(this.customer);
        this.customer.name = "name";
    }

    async SaveCustomer (customer){
        try {
          
            const newCustomer = new this.CustomerModel(customer);
            const save_customer = await newCustomer.save();
        /*  const {_id} = await save_customer.toJSON();
            const token = jwt.sign({_id:_id},"secret")
            customer.cookie("jwt",token,{
                httpOnly:true,
                maxAge:24*60*60*1000});*/
            return save_customer;
        } catch (error) {
            throw error;
        }
    }
 
    async getCustomer (){
        let client = null;
        let db = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
            let customerArray = await db.collection('customers').find({}).toArray();
            return customerArray;
        } catch (error) {
            throw error;
        }
    }

    async getLoginProcessing (email,passwordC){
        let client = null;
        let db = null;
        try {
            client = await getClient();
            db = client.db(process.env.DB_NAME);
           let customerArray = await db.collection('customers').findOne({"email": email,"password":passwordC});
            console.log('customerArray:===============', customerArray);
            return customerArray;
        } catch (error) {

            console.log('error:', error);
            throw error;
        }
    }
    
}

module.exports = new Customer();
