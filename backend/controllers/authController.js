import { autenticarUsuario } from "../services/authService.js";
import { generarToken } from "../helpers/jwtHelper.js";

export async function login(req, res, next) {
  try {
    const datos = await autenticarUsuario(req.body);
    if (!datos) {
      return res
        .status(401)
        .json({ success: false, message: "Credenciales inválidas" });
    }

    const token = generarToken(datos);
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
}

