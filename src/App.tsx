import { useState } from 'react';
import AddExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';

interface Expense {
	id: number;
	description: string;
	category: string;
	amount: number;
}

function App() {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [expenses, setExpenses] = useState<Expense[]>([]);

	// filter expense
	const filterExpense = (expenses: Expense[]) => {
		return expenses.filter(
			(expense) => expense.category.toLowerCase() === selectedCategory.toLowerCase()
		);
	};

	const addExpense = (expense: Omit<Expense, 'id'>) => {
		const newExpense = { ...expense, id: expenses.length + 1 };
		setExpenses([...expenses, newExpense])
	};

	const deleteExpense = (id: number) => {
		setExpenses(expenses.filter((expense) => id !== expense.id));
	};

	const selectCategory = (category: string) => {
		setSelectedCategory(category);
	};

	const visibleExpense = selectedCategory ? filterExpense(expenses) : expenses;

	return (
		<div className='container p-3'>
			<div className="mb-4 text-center">
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
