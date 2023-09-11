import jwt from "jsonwebtoken";

export function signJwtAccessToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

export function verifyJwtAccessToken(token) {
  try {
    const decodedjwt = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return decodedjwt;
  } catch (error) {
    console.log(error);
    return null;
  }
}
