const baseUrl = 'https://localhost:7264/api/todos';
export const GetAll = async () => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}

export const Create = async (todo) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todo, isCompleted: false }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
  
      return response.json();
}

export const Remove = async (todoId) => {
    const response = await fetch(`${baseUrl}/${todoId}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
}