import axios from "axios";

export default async function getAllUsers() {
  try {
    const res = await axios.get(
      `https://server.adsporty.com/getAllUsers`
    );
    return res.data;
  } catch (error) {
    console.error("");
  }
}
