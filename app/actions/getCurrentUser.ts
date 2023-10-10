import axios from "axios";
import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";

export default async function getCurrentUser() {
  const nextCookies = cookies();
  const token = nextCookies.get("jwt");
  const JWT = token?.value;
  let id;

  if (JWT) {
    try {
      const decodedToken: { id?: string } = jwtDecode(JWT);

      id = decodedToken.id;

      const res = await axios.get(`https://server.adsporty.com/currentUser/${id}`);
      return res.data;
    } catch (error) {
      console.error("");
    }
  }

  return null;
}
