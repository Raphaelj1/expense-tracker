import { useState } from 'react';
import AddExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import expensesJson from '../src/expenses.json';

interface Expense {
	id: number;
	description: string;
	category: string;
	amount: number;
}

function App() {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [expenses, setExpenses] = useState([]);

	// filter expense
	const filterExpense = (expenses: Expense[]) => {
		return expenses.filter(
			(expense) => expense.category.toLowerCase() === selectedCategory.toLowerCase()
		);
	};

	const addExpense = (expense) => {
		setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
	};

	const deleteExpense = (id: number) => {
		setExpenses(expenses.filter((expense) => id !== expense.id));
	};

	const selectCategory = (category: string) => {
		setSelectedCategory(category);
	};

	const visibleExpense = selectedCategory ? filterExpense(expenses) : expenses;

	return (
		<div>
			<div className="mb-3 text-center">
				<h3>Expense Calculator 💶</h3>
			</div>
			<div className="mb-5">
				<AddExpenseForm onSubmit={addExpense} />
			</div>
			<div className="mb-3">
				<ExpenseFilter onSelectCategory={selectCategory} />
			</div>
			<div className="mb-3 overflow-auto">
				<ExpenseList expenses={visibleExpense} onDelete={deleteExpense} />
			</div>
		</div>
	);
}

export default App;
