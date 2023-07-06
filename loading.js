import { readTodos } from './api.js';
import { renderTodos } from './main.js';

const loadingEl = document.querySelector('.loading');

export const loading = async () => {
	const todos = await readTodos();
	loadingEl.style.display = 'block';
	setTimeout(() => {
		loadingEl.style.display = 'none';
		renderTodos(todos);
	}, 1000);
};

export const selectLoading = (item) => {
	loadingEl.style.display = 'block';
	setTimeout(() => {
		loadingEl.style.display = 'none';
		renderTodos(item);
	});
};
