
const ManagerModel = require('../../models/Manager/Manager');
class ManagerController{

    async LoginManager(req,res){
        try {
            let manager = req.body;
            let token = await ManagerModel.LoginManager(manager);
            if(token!==null){
                res.send({token,status:200,message:"request success"});
            }else{
                return res.json({ message: 'login ou mot de passe incorrect',status:401 });
            }
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

    async SaveManager(req,res){
        try {
            let manager = req.body ;
            let result = await ManagerModel.SaveManager(manager);
            res.send({result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }
}

module.exports = new ManagerController();