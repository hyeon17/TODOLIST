import { updateTodo } from './api.js';
import { loading } from './loading.js';

export const editButton = (todo) => {
	const edit_btnEl = document.createElement('div');
	edit_btnEl.classList.add('edit_btn');
	edit_btnEl.textContent = '📝';
	edit_btnEl.addEventListener('click', async () => {
		const newTitle = prompt('수정할 내용을 입력하세요');
		if (newTitle) {
			await updateTodo({
				...todo,
				title: newTitle,
			});
			loading();
		}
	});

	return edit_btnEl;
}
