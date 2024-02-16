import { decodeJwt } from "../helpers/jwtHelper";

const baseUrl = "https://localhost:7264/api/todos";
export const GetAll = async (page) => {
  // const response = await fetch(`${baseUrl}?page=${page}`);
  // if (!response.ok) {
  //   throw new Error("Failed to fetch todos");
  // }
  // return response.json();

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated.");
  }
  const response = await fetch(`${baseUrl}?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

export const GetTodosCount = async () => {
  const response = await fetch(`${baseUrl}/count`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

export const Create = async (todo) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = decodeJwt(token);
    const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo,
        isCompleted: false,
        ownerId: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add todo");
    }

    return response.json();
  }
};

export const Remove = async (todoId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated.");
  }
  const response = await fetch(`${baseUrl}/${todoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export const Uncomplete = async (todoId) => {
  try {
    const response = await fetch(`${baseUrl}/${todoId}`);
    const result = await response.json();
    result.isCompleted = false;
    await Edit(todoId, result);
  } catch (error) {
    console.error("Error uncompleting todo:", error);
    throw new Error("Failed to uncomplete todo");
  }
};
