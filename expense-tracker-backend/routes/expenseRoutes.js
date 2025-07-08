const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense')
const { protect } = require('../middleware/authMiddleWare');

router.post('/', protect, async(req,res)=>{
    const {description, amount, category, date} = req.body;

    if(!description || !amount){
        return res.status(400).json({message:'Description and amount are required'});
    }

    try{
        const newExpense = new Expense({
            user: req.user._id,
            title: description, // Map description to title
            amount,
            category,
            date
        });

        const savedExpense = await newExpense.save();

        res.status(201).json({
            message: 'Expense added successfully',
            expense: savedExpense
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Server error'});
    }
});

router.get('/', protect, async(req,res)=>{
    try{
        const expenses = await Expense.find({user: req.user._id}).sort({date:-1});
    
        res.status(200).json(expenses);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server error while fetching expenses'});
    }
    
})

router.put('/:id', protect, async(req,res)=>{
    const expenseId = req.params.id;

    try{
        const expense = await Expense.findById(expenseId);
        if(!expense){
            return res.status(404).json({message:'Expense not found!'});
        }
        if(expense.user.toString()!==req.user._id.toString()){
            return res.status(401).json({mesage:'Not authorized to update this expense'})
        }

        const {description, amount, category, date} = req.body;
        if (description !== undefined) expense.title = description;
        if (amount !== undefined) expense.amount = amount;
        if (category !== undefined) expense.category = category;
        if (date !== undefined) expense.date = date;

        const updatedExpense = await expense.save();

        res.status(200).json({
            message:'Expense updated successfully',
            expense: updatedExpense,
        });
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Server error while updating expense'});
    }
});

router.delete('/:id', protect, async(req,res)=>{
    const expenseId = req.params.id;
    try{
        const expense = await Expense.findById(expenseId);

        if(!expense){
            return res.status(404).json({message:'Expense not found'});
        }

        if(expense.user.toString()!== req.user._id.toString()){
            return res.status(401).json({message:'Not authorized to delete this expense!'})
        }
        await expense.deleteOne();
        res.status(200).json({message:'Expense deleted successfully'})
   } catch (err){
    console.error(err);
    res.status(500).json({message:'Server error while deleting expense'});
   }
});

module.exports = router;