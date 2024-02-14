

const ServiceModel = require('../../models/Manager/Service')
const { getClient } = require('../../Utility/db');
class ServiceController {

    async SaveService(req,res){
        try {
            let service = {...req.body}
            const ServiceCreate = await ServiceModel.SaveService(service);
            res.status(200).send({"data":ServiceCreate,status:200,message:"request success"});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})            
        }
    }

    async getServices(req,res){
        let client = null;
        try {
            let offset = req.params._offset;
            let limit = req.params._limit;
            client = await getClient();
            let db = client.db(process.env.DB_NAME); 
            const data = await ServiceModel.getService(db,offset,limit);
            const lineNumber = await ServiceModel.getLigneNumber(db,limit);
            return res.status(200).send({data,status:200,message:"request with success",lineNumber:lineNumber})
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }finally{
            if (client!=null) {
                client.close();
            }
        }
    }
}

module.exports = new ServiceController();