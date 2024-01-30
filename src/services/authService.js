const baseUrl = "https://localhost:7264";
export const register = async (user) => {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return response;
    } catch (err) {
        throw new Error(err.message);
    }
}