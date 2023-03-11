import React, { useState } from "react";

function Home() {
  const [activity, setActivity] = useState("");

  const [todos, setTodos] = useState([]);

  const [edit, setEdit] = useState({});

  const handleChange = (e) => {
    setActivity(e.target.value);
  };

  const generateId = () => {
    return Date.now();
  };

  const handleEdit = (todo) => {
    console.log(todo);

    setActivity(todo.activity);

    setEdit(todo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit.id) {
      const editTodo = {
        id: edit.id,
        activity,
      };

      const i = todos.findIndex((todo) => {
        return todo.id === edit.id;
      });

      const cloneTodos = [...todos];

      cloneTodos[i] = editTodo;

      setTodos(cloneTodos);

      setEdit({});

      return;
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity: activity,
      },
    ]);

    setActivity("");
  };

  const handleRemove = (todoId) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    });

    setTodos(filteredTodos);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setActivity("");

    setEdit({});
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden ml-12">
      <main className="flex-grow w-full">
        <h1 className="h1 text-center">Simple To Do List</h1>

        <form onSubmit={handleSubmit}>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Aktivitas mu"
                onChange={handleChange}
                value={activity}
              />
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {edit.id ? "Update" : "Save New"}
          </button>
          {edit.id && (
            <button
              type="submit"
              class="mx-4 text-white bg-yellow-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleCancel}
            >
              Cancel Update
            </button>
          )}
        </form>
        <ul className="mt-6 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          {todos.map((todo, i) => {
            return (
              <li key={todo.id}>
                <span>{i + 1} </span>
                {todo.activity}
                <button
                  onClick={handleEdit.bind(this, todo)}
                  className="mx-4 underline decoration-sky-300 text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleRemove.bind(this, todo.id)}
                  className="mx-4 underline decoration-sky-300 text-blue-600"
                >
                  Hapus
                </button>
              </li>
            );
          })}
        </ul>
      </main>

      {/*  Site footer */}
    </div>
  );
}

export default Home;
