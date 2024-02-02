// jwtHelper.js

function decodeJwt(token) {
    const [header, payload, signature] = token.split('.');
  
    // The payload is Base64Url-encoded, so decode it
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  
    // Parse the JSON payload
    const parsedPayload = JSON.parse(decodedPayload);
  
    return parsedPayload;
  }
  
  export { decodeJwt };
  