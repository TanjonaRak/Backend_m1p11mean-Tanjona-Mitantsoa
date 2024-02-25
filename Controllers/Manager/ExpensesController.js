
const ExpensesModel = require('../../models/Manager/Expenses');

class ExpensesController {

    async SaveExpenses(req,res){
        try {
            let expenses = {...req.body};
            const expensesNew = await ExpensesModel.SaveExpenses(expenses);
            res.status(200).send({"data":expensesNew,status:200,message:"request success"}); 
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }
}
module.exports = new ExpensesController();