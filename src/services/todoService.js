const baseUrl = 'https://localhost:7264/api/todos';
export const GetAll = async () => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}