export const dateEl = (createdAt, updatedAt) =>{
	const element = document.createElement('div');
	element.classList.add('todo__date');
	const createdAtDate = new Date(createdAt);
	const updatedAtDate = new Date(updatedAt);
	const earliestDate = createdAtDate < updatedAtDate ? updatedAtDate : createdAtDate;
	element.innerHTML = `<span class="createdAt">작성일 : ${dayjs(earliestDate).format('YYYY-MM-DD')}</span>`;

	return element;
}
