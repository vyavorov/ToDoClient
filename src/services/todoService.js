const baseUrl = "https://localhost:7264/api/todos";
export const GetAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

export const Create = async (todo) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: todo, isCompleted: false }),
  });

  if (!response.ok) {
    throw new Error("Failed to add todo");
  }

  return response.json();
};

export const Remove = async (todoId) => {
  const response = await fetch(`${baseUrl}/${todoId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};

export const Edit = async (id, todo) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to edit todo");
  }

  return response.json();
};

export const Complete = async (todoId) => {
  try {
    const response = await fetch(`${baseUrl}/${todoId}`);
    const result = await response.json();
    result.isCompleted = true;
    await Edit(todoId, result);
  } catch (err) {
    console.error("Error completing todo:", error);
    throw new Error("Failed to complete todo");
  }

  // await fetch(`${baseUrl}/${todoId}`)
  //     .then(response => response.json())
  //     .then(result => console.log(result))
  //     .catch(error => console.error(error));
};
