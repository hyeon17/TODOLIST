import { readTodos } from './api.js';
import { selectLoading } from './loading.js';
const selectEl = document.querySelector('.header__select');

export const Filter = () => {
	selectEl.addEventListener('change', async () => {
		if (selectEl.value === 'done') {
			const todos = await readTodos();
			selectLoading(todos.filter((todo) => todo.done));
		} else if (selectEl.value === 'todo') {
			const todos = await readTodos();
			selectLoading(todos.filter((todo) => !todo.done));
		} else if (selectEl.value === 'all') {
			const todos = await readTodos();
			selectLoading(todos);
		}
	});
};
