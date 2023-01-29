const headers = {
  "Content-Type": "application/json",
  apikey: "FcKdtJs202301",
  username: "KDT4_JangHyeonJun",
};

// 생성
export async function createTodo(title) {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        title,
      }),
    }
  );
  const json = await res.json();
  console.log(json);
}

// 읽기
export async function readTodos() {
  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
    {
      method: "GET",
      headers,
    }
  );
  const json = await res.json();
  return json;
}

// 수정
export async function updateTodo(todo) {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        title: todo.title,
        done: todo.done,
      }),
    }
  );
  const json = await res.json();
  console.log(json);
}

// 삭제
export async function deleteTodo(todo) {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
    {
      method: "DELETE",
      headers,
    }
  );
  const json = await res.json();
  console.log(json);
}
