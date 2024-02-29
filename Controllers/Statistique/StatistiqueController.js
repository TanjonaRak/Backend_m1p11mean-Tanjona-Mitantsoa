const StatistiqueManagerModel =  require('../../models/Statistique/StatistiqueManager');

class StatistiqueController {

    async getStateHoursPerEmployee(req,res){
        try {
            let year = req.params._year ;
            let month = req.params._month;

            let result = await StatistiqueManagerModel.getStateManager(year,month);
            res.status(200).send({result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }

    async getStateExpenses(req,res){
        try {
            let year = req.params._year ;
            // let month = req.params._month;

            let result = await StatistiqueManagerModel.getSTATE2(year);
            res.status(200).send({result,status:200,message:"request success"});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }
}

module.exports = new StatistiqueController();