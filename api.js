const headers = {
	'Content-Type': 'application/json',
	apikey: 'FcKdtJs202301',
	username: 'KDT4_JangHyeonJun',
};

const endPoint = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos';

// 목록 조회
export async function readTodos() {
	const res = await fetch(endPoint, {
		method: 'GET',
		headers,
	});
	const json = await res.json();
	return json;
}
// 목록 순서 변경
export async function reOrder(id) {
	const res = await fetch(`${endPoint}/reorder`, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			id,
		}),
	});
	const json = await res.json();
	return json;
}

// 항목 추가
export async function createTodo(title, order) {
	const res = await fetch(endPoint, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			title,
			order,
		}),
	});
	const json = await res.json();
	return json;
}

// 항목 수정
export async function updateTodo(todo) {
	const res = await fetch(endPoint + `/${todo.id}`, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			title: todo.title,
			done: todo.done,
			order: todo.order,
		}),
	});
	const json = await res.json();
	return json;
}

// 삭제
export async function deleteTodo(id) {
	const res = await fetch(endPoint + `/${id}`, {
		method: 'DELETE',
		headers,
	});
	const json = await res.json();
	return json;
}
