import { deleteTodo } from './api.js';
import { loading } from './loading.js';

export const deleteButton = (todo) => {
	const del_btnEl = document.createElement('div');
	del_btnEl.classList.add('del__btn');
	del_btnEl.textContent = '❌';
	del_btnEl.addEventListener('click', async () => {
		await deleteTodo(todo);
		const todoItem = JSON.parse(localStorage.getItem('todo')) || [];
		const updatedTodoItem = todoItem.filter((item) => item.id !== todo);
		localStorage.setItem('todo', JSON.stringify(updatedTodoItem));
		loading();
	});
	return del_btnEl;
};
