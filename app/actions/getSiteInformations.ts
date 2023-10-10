import axios from "axios";

export default async function getSiteInformations() {
  try {
    const res = await axios.get(`https://server.adsporty.com/admin/get-informations`);
    return res.data;
  } catch (error) {
    console.error("");
  }
}
