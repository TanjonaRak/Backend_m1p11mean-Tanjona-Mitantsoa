const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { getClient } = require('../../Utility/db');
require('dotenv').config();
const { ObjectId } = require('mongoose').Types;
const secretKey = 'm1p11mean-manager'; 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Manager {

    manager = new Schema({
        // _id : {type:String,req}
        name : {type : String},
        login : {type :String,required : true},
        password : {type:String, required : true},
        date_create: {type:Date},
        state : {type:Number}
    })

    ManagerModel = mongoose.model('managers',this.manager);

    async LoginManager(manager){
        let client = null;
        try {
            client = await getClient();
            let db = client.db(process.env.DB_NAME);
            let user =await  db.collection('managers').find({login:manager.login}).sort({"date_create":-1}).toArray();
            console.log(user[0])
            if(user.length!==0 && (await bcrypt.compare(manager.password, user[0].password))){           
                const token = jwt.sign({_id:user[0].id, login: user[0].login,email:user[0].email,name:user[0].name}, secretKey, { expiresIn: '1h' });
                return {token,"name":user[0].first_name,"_id":user[0]._id};
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }finally{
            if(client!==null)client.close();
        }
    }

    async SaveManager (manager){
        try {
            // let isEmail = await this.VerifyObject(employee);
            // await this.VerifyData(manager);
            // if(isEmail){
                // console.log(JSOemployee)
                const newMan = new this.ManagerModel(manager);
                newMan.date_create = new Date();
                const salt = await bcrypt.genSalt(10);
                
                // Crypter le mot de passe avec le sel
                const hashedPassword = await bcrypt.hash(newMan.password, salt);
                newMan.password = hashedPassword;
                const manager_save = await newMan.save();
                // await this.SendEmailSignUp(employee.email,employee.login,employee.password);
                return manager_save;
            // }else{
            //     return null;
            // }
           
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new Manager();