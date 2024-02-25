const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getClient } = require('../../Utility/db');
const { sendMailToUser } = require('../../Utility/EmailUtils');
require('dotenv').config();
const { ObjectId } = require('mongoose').Types;

class Employee {

    employee = new Schema({
        name : {type:String,required : true},
        first_name : {type:String , required :true},
        login : {type:String , required :true},
        email :{
            type:String , 
            required :true,
            unique:true
        },
        password : {type:String , required :true},
        etat : {type:Number},
        service : {type : Array },
        time_between : {type : String},
        end_time : {type :String},
        date_create : {type:Date},
        working_hours:{type:Object},
        picture:{type:String}
    })

    
    // unique:true,
    // validate:{
    //     validator:function(v){
    //         return /^([\w-]+.)+[\w-]{2,4})?$/.test(v);
    //     },
    //     message:props =>`${props.value} is not a mail valide !`
    // }


    EmployeModel = mongoose.model('employee',this.employee);

    /*
        {
            "name" :"RAKOTO",
            "first_name" : "ROBERT",
            "login" : "LOGIN",
            "email":"tanjona@gmail.com",
            "password" : "1234",


        }
    */

    constructor (){
    }

    async VerifyObject(employee){
        console.log(employee.email)
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(employee.email);  
    }

    async SaveEmployee (employee){
        try {
            let isEmail = await this.VerifyObject(employee);
            if(isEmail){
                const newEmp = new this.EmployeModel(employee);
                newEmp.date_create = new Date();
                const employee_Save = await newEmp.save();
                // this.SendEmailSignUp(employee.email,employee.login,employee.password);
                return employee_Save;
            }else{
                return null;
            }
           
        } catch (error) {
            throw error;
        }
    }

    async getEmployee(db,offset,limit){
        let client = null;
        let db_test = 0;
        // console.log(offset)
        // console.log(limit)
        try {
            if(db == null){
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME); 
            }
            let result = await db.collection('employees').find({}).sort({_id:-1}).skip(Number(offset)).limit(Number(limit)).toArray();
            console.log(result)
            return result;
        } catch (error) {
            throw error;
        }finally {
            if (db_test != 0 && client!=null) {
                client.close();
            }
        }
    }

    async getLigneNumber(db,limit){
        try {
            let result = await db.collection('employees').find({}).toArray();
            return parseInt(((result.length/limit) + 1));
        } catch (error) {
            throw error;
        }
    }

    async UpdateEmployee (employee,id,db){
        let client = null;
        let db_test = 0;
        let result = null;
        try {
            // console.log(employee)
            let isEmail = await this.VerifyObject(employee);
            const newEmp = new this.EmployeModel(employee);
            console.log(isEmail)
            if(isEmail){
                if(db == null){
                    db_test = 1;
                    client = await getClient();
                    db = client.db(process.env.DB_NAME); 
                }    
                // if(employee.working_hours){
                //     this.HoursWorkingSave(employee.working_hours,db);
                // }
                // result  = await db.collection('employees').updateOne(
                // {_id :new ObjectId(employee._id)},
                // {$set:{
                //     name:newEmp.name,
                //     first_name : newEmp.first_name,
                //     email : newEmp.email,
                //     password : newEmp.password,
                //     login : newEmp.login,
                //     service : newEmp.service,
                //     date_last_update : new Date(),
                //     time_between : newEmp.working_hours.time_between,
                //     end_time : newEmp.working_hours.end_time,
                //     working_hours : newEmp.working_hours
                    
                // }});
                result = await this.EmployeModel.findOneAndUpdate(
                    {_id :employee._id},
                    newEmp,
                    { new: true }
                );
                
                return result;
            }else{
                throw new Error("Email Not Valid");
            }
            // let result = newEmp.save();

        } catch (error) {
            throw error;
        }finally {
            if (db_test != 0 && client!=null) {
                client.close();
            }
        }
    }

    async getEmployeeById(_id,db){
        let client = null;
        let db_test = 0;
        let result = null;
        try {
            if(db===null){
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME);
            }
            result = db.collection('employees').findOne({_id:new ObjectId(_id)});
            return result;
        } catch (error) {
            throw error;
        }
    }

    async DeleteEmployee(_id){
        try {
            
        } catch (error) {
            
        }
    }

    async HoursWorkingSave(hoursWork,db){
        let client = null;
        let db_test = 0;
        let result = null;
        try {
            if(db===null){
                db_test = 1;
                client = await getClient();
                db = client.db(process.env.DB_NAME);
            }
            hoursWork.date_create = new Date();
            result = db.collection('work_hours').insertOne(hoursWork);
            return result;
        } catch (error) {
            throw error;
        }
        // finally{
        //     if(client!==null && db_test===1){
        //         client.close();
        //     }
        // }
    }

    async SendEmailSignUp(email,login,password){
        const html = `<!DOCTYPE html>
          <html
          lang="en"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:v="urn:schemas-microsoft-com:vml"
          >
            <head>
            <title></title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <!--[if mso
                ]><xml
                    ><o:OfficeDocumentSettings
                        ><o:PixelsPerInch>96</o:PixelsPerInch
                        ><o:AllowPNG /></o:OfficeDocumentSettings></xml
            ><![endif]-->
            <style>
                * {
                    box-sizing: border-box;
                }
    
                body {
                    margin: 0;
                    padding: 0;
                }
    
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: inherit !important;
                }
    
                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                }
    
                p {
                    line-height: inherit;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    mso-hide: all;
                    display: none;
                    max-height: 0px;
                    overflow: hidden;
                }
    
                @media (max-width: 520px) {
                    .desktop_hide table.icons-inner {
                        display: inline-block !important;
                    }
    
                    .icons-inner {
                        text-align: center;
                    }
    
                    .icons-inner td {
                        margin: 0 auto;
                    }
    
                    .row-content {
                        width: 100% !important;
                    }
    
                    .mobile_hide {
                        display: none;
                    }
    
                    .stack .column {
                        width: 100%;
                        display: block;
                    }
    
                    .mobile_hide {
                        min-height: 0;
                        max-height: 0;
                        max-width: 0;
                        overflow: hidden;
                        font-size: 0px;
                    }
    
                    .desktop_hide,
                    .desktop_hide table {
                        display: table !important;
                        max-height: none !important;
                    }
                }
            </style>
            </head>

            <body>
                <h3>Email the manager </h3><h4> your login `+login+`</h4><h4> your passord`+password+`</h4></body>
          </html>`
          return sendMailToUser(email,html,"Email for login in Beauty.com");
    }

    


    
}

module.exports = new Employee();