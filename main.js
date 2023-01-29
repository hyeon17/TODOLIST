import { createTodo, readTodos, updateTodo, deleteTodo } from "./request.js";

let preventDoubleClick = false;
const inputEl = document.querySelector(".header__input");
const create_btnEl = document.querySelector(".header__inputBtn");
const listEl = document.querySelector(".list");
const all_del_btnEl = document.querySelector(".header__deleteBtn");
const loadingEl = document.querySelector(".loading");
const selectEl = document.querySelector(".header__select");

// 입력시 inputText에 저장
let inputText = "";
inputEl.addEventListener("input", () => {
  inputText = inputEl.value;
});

// 입력 후 엔터시 생성
inputEl.addEventListener("keydown", (event) => {
  // event.isComposing는 한글 입력시 필수로 넣어야 함
  if (event.key === "Enter" && !event.isComposing) {
    create_btnEl.click();
    inputEl.value = "";
  }
});

// 생성 버튼 클릭시 생성
create_btnEl.addEventListener("click", async () => {
  if (preventDoubleClick) return;
  preventDoubleClick = true;
  await createTodo(inputText);
  const todos = await readTodos();
  loadingEl.style.display = "block";
  setTimeout(() => {
    loadingEl.style.display = "none";
    renderTodos(todos);
  }, 800);
  preventDoubleClick = false;
});

// 전체 삭제 버튼 클릭시 삭제
all_del_btnEl.addEventListener("click", async () => {
  if (preventDoubleClick) return;
  preventDoubleClick = true;
  const todos = await readTodos();
  todos.forEach(async (todo) => {
    await deleteTodo(todo);
  });
  loadingEl.style.display = "block";
  setTimeout(() => {
    loadingEl.style.display = "none";
    renderTodos(todos);
    location.reload();
  }, 3000);
  preventDoubleClick = false;
});

// 드래그 앤 드랍
Sortable.create(listEl, {
  animation: 150,
  ghostClass: "blue-background-class",
});

// 즉시 실행 함수
(async () => {
  const todos = await readTodos();
  setTimeout(() => {
    loadingEl.style.display = "none";
    renderTodos(todos);
  }, 1000);
})();

// 렌더링
async function renderTodos(todos) {
  const liEls = todos.map((todo) => {
    const liEl = document.createElement("li");
    liEl.classList.add("list__item");
    liEl.innerHTML = `<span class="todo__title">${todo.title}</span>`;

    // 중요도 표시
    const priorityEl = document.createElement("select");
    priorityEl.classList.add("priority");
    const priority1 = document.createElement("option");
    const priority2 = document.createElement("option");
    const priority3 = document.createElement("option");
    priority1.value = "0";
    priority1.textContent = "⭐⭐⭐";
    priority2.value = "1";
    priority2.textContent = "⭐⭐";
    priority3.value = "2";
    priority3.textContent = "⭐";
    priorityEl.append(priority1, priority2, priority3);

    priorityEl.addEventListener("change", async () => {
      if (priorityEl.value === "0") {
        done_btnEl.classList.add("done__btn--red");
        done_btnEl.classList.remove("done__btn--blue");
        done_btnEl.classList.remove("done__btn--green");
        const todos = await readTodos();
        loadingEl.style.display = "block";
        setTimeout(() => {
          loadingEl.style.display = "none";
          readTodos(todos);
        }, 1000);
      } else if (priorityEl.value === "1") {
        done_btnEl.classList.add("done__btn--blue");
        done_btnEl.classList.remove("done__btn--red");
        done_btnEl.classList.remove("done__btn--green");
        const todos = await readTodos();
        loadingEl.style.display = "block";
        setTimeout(() => {
          loadingEl.style.display = "none";
          readTodos(todos);
        }, 1000);
      } else if (priorityEl.value === "2") {
        done_btnEl.classList.add("done__btn--green");
        done_btnEl.classList.remove("done__btn--red");
        done_btnEl.classList.remove("done__btn--blue");
        const todos = await readTodos();
        loadingEl.style.display = "block";
        setTimeout(() => {
          loadingEl.style.display = "none";
          readTodos(todos);
        }, 1000);
      }
    });
    

    // 완료 버튼
    const done_btnEl = document.createElement("div");
    done_btnEl.classList.add("done__btn");
    done_btnEl.addEventListener("click", async () => {
      await updateTodo({
        ...todo,
        done: !todo.done,
      });
      const todos = await readTodos();
      loadingEl.style.display = "block";
      setTimeout(() => {
        loadingEl.style.display = "none";
        renderTodos(todos);
      }, 1000);
    });
    if (todo.done) {
      liEl.classList.add("done");
      done_btnEl.classList.add("done__btn--checked");
    }

    // 수정 버튼
    const edit_btnEl = document.createElement("div");
    edit_btnEl.classList.add("edit_btn");
    edit_btnEl.textContent = "📝";
    edit_btnEl.addEventListener("click", async () => {
      const newTitle = prompt("수정할 내용을 입력하세요");
      if (newTitle) {
        await updateTodo({
          ...todo,
          title: newTitle,
        });
        const todos = await readTodos();
        loadingEl.style.display = "block";
        setTimeout(() => {
          loadingEl.style.display = "none";
          renderTodos(todos);
        }, 1000);
      }
    });

    // 삭제 버튼
    const del_btnEl = document.createElement("div");
    del_btnEl.classList.add("del__btn");
    del_btnEl.textContent = "❌";
    del_btnEl.addEventListener("click", async () => {
      await deleteTodo(todo);
      const todos = await readTodos();
      loadingEl.style.display = "block";
      setTimeout(() => {
        loadingEl.style.display = "none";
        renderTodos(todos);
      }, 1000);
    });

    // 생성일
    const dateEl = document.createElement("div");
    dateEl.classList.add("todo__date");
    dateEl.innerHTML = `<span class="createdAt">생성일 : ${new Date(
      todo.createdAt
    ).toLocaleString()}</span>`;

    // 수정일
    const updateEl = document.createElement("div");
    updateEl.classList.add("todo__update");
    updateEl.innerHTML = `<span class="updatedAt">수정일 : ${new Date(
      todo.updatedAt
    ).toLocaleString()}</span>`;

    // 분류 버튼
    selectEl.addEventListener("change", async () => {
      if (selectEl.value === "done") {
        const todos = await readTodos();
        loadingEl.style.display = "block";
        setTimeout(() => {
          loadingEl.style.display = "none";
          renderTodos(todos.filter((todo) => todo.done));
        }, 1000);
      } else if (selectEl.value === "todo") {
        const todos = await readTodos();
        loadingEl.style.display = "block";
        setTimeout(() => {
          loadingEl.style.display = "none";
          renderTodos(todos.filter((todo) => !todo.done));
        }, 1000);
      } else if (selectEl.value === "all") {
        const todos = await readTodos();
        loadingEl.style.display = "block";
        setTimeout(() => {
          loadingEl.style.display = "none";
          renderTodos(todos);
        }, 1000);
      }
    });

    liEl.append(
      done_btnEl,
      edit_btnEl,
      del_btnEl,
      dateEl,
      updateEl,
      priorityEl
    );
    return liEl;
  });
  listEl.innerHTML = "";
  listEl.append(...liEls);
}
