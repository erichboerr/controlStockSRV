import axios from "axios";
import { guardarToken } from "../../../common/utils/auth";
import { authUrl } from "../../../config/env.js"

export async function loginUser(formData) {  
  try {
    //console.log(`${authUrl}/login`);
    //console.log(formData);
    const { data } = await axios.post(`${authUrl}/login`, formData);
    if (data.token) {
      guardarToken(data.token);
      return data;
    }
  } catch (error) {
    throw error.response?.data?.message || "Error al conectar con el servidor";
  }
}
