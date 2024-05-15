import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Input
} from '@mui/material';
import { MdDeleteOutline } from "react-icons/md";

const ExpenseTracker = () => {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [billImage, setBillImage] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (expenseTitle && expenseAmount) {
      const newExpense = {
        title: expenseTitle,
        amount: parseFloat(expenseAmount),
        image: billImage,
      };
      setExpenses([...expenses, newExpense]);
      setExpenseTitle('');
      setExpenseAmount('');
      setBillImage(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBillImage(file);
  };

  const handleExpenseDelete = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Expense Tracker
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleExpenseSubmit}>
            <TextField
              label="Expense Title"
              variant="outlined"
              fullWidth
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Expense Amount"
              variant="outlined"
              fullWidth
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              margin="normal"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            //   margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>
      <Box marginTop={4}>
        <Typography variant="h6" component="h2" gutterBottom>
          Expenses List
        </Typography>
        <List>
          {expenses.map((expense, index) => (
            <ListItem key={index} >
              <ListItemText
                primary={expense.title}
                secondary={`Amount: $${expense.amount.toFixed(2)}`}
                sx={{color:'#fff','& .MuiTypography-root ':{color:'#fff',margin:'10px 0'}}}
              />
              {expense.image && (
                <img
                  src={URL.createObjectURL(expense.image)}
                  alt="Bill"
                  style={{ maxWidth: 100, marginRight: 16 }}
                />
              )}
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleExpenseDelete(index)}
                sx={{color:'#fff'}}
              >
                <MdDeleteOutline />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ExpenseTracker;