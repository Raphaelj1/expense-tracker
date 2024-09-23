import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categories } from '../constants';

const schema = z.object({
	description: z
		.string()
		.min(3, { message: 'Description should be at least 3 characters.' })
		.max(50),
	amount: z
		.number({ invalid_type_error: 'Amount is required.' })
		.min(0.01, { message: 'Amount should be greater than 0' })
		.max(100_000),
	category: z.enum(categories, { errorMap: () => ({ message: 'Category is required.' }) }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
	onSubmit: (data: ExpenseFormData) => void;
}

function AddExpenseForm({ onSubmit }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

	return (
		<form
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
				reset();
			})}
		>
			<div className="mb-3">
				<label htmlFor="description" className="form-label">
					Description
				</label>
				<input
					{...register('description')}
					type="text"
					id="description"
					className="form-control"
				/>
				{errors.description && <p className="text-danger">{errors.description.message}</p>}
			</div>

			<div className="mb-3">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					{...register('amount', { valueAsNumber: true })}
					type="number"
					id="amount"
					name="amount"
					className="form-control"
				/>
				{errors.amount && <p className="text-danger">{errors.amount.message}</p>}
			</div>

			<div className="mb-3">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<select {...register('category')} id="category" className="form-select">
					<option value=""></option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				{errors.category && <p className="text-danger">{errors.category.message}</p>}
			</div>

			<button disabled={!isValid} type="submit" className="btn btn-primary">
				+ Add expense
			</button>
		</form>
	);
}

export default AddExpenseForm;
