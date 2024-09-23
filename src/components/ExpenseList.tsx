interface Expense {
	id: number;
	description: string;
	amount: number;
	category: string;
}

interface Props {
	expenses: Expense[];
	onDelete: (id: number) => void;
}

function ExpenseList({ expenses, onDelete }: Props) {
	if (expenses.length === 0) return <p className='fs-6 text-black-50'>It looks like your expense list is empty.</p>;

	return (
		<table className="table table-bordered">
			<thead>
				<tr>
					<th>Description</th>
					<th>Amount</th>
					<th>Category</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{expenses.map((expense) => (
					<tr key={expense.id}>
						<td>{expense.description}</td>
						<td>${expense.amount}</td>
						<td>{expense.category}</td>
						<td>
							<button
								className="btn btn-outline-danger"
								onClick={() => onDelete(expense.id)}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr className='fw-bold'>
					<td>Total</td>
					<td>
						$
						{expenses
							.reduce((acc, expense) => {
								return expense.amount + acc;
							}, 0)
							.toFixed(2)}
					</td>
					<td></td>
					<td></td>
				</tr>
			</tfoot>
		</table>
	);
}

export default ExpenseList;
