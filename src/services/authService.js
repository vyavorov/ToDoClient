// const baseUrl = "https://localhost:7264";
const baseUrl = "https://morning-savannah-54910-88f77ffc3501.herokuapp.com";
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
};

export const login = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
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
};

export const changePassword = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/changePassword`, {
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
};
