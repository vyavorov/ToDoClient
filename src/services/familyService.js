import { decodeJwt } from "../helpers/jwtHelper";

const baseUrl = "https://localhost:7264/api/families";

export const Create = async (userEmail, familyName, invitedUserEmail) => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        familyName: familyName,
        invitedUserEmail: invitedUserEmail,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create family");
    }

    return response.json();
  }
};
