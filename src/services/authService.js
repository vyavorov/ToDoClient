const baseUrl = "https://localhost:7264/register";
export const register = async (user) => {
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
    } catch (err) {
        throw new Error(err.message);
    }
}