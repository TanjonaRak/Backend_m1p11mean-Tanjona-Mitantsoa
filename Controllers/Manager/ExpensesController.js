
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

    async getExpenses(req,res){
        try {
            let offset = req.params._offset;
            let limit =req.params._limit;
            let expense = {...req.body}
            let result = await ExpensesModel.getDepenses(expense,offset,limit);
            console.log(result)
            res.send({"data":result.result,"lineNumber":result.lineNumber,"message":"request with success",status:200});
        } catch (error) {
            res.send({message:error.message,status:500})
        }
    }
}
module.exports = new ExpensesController();