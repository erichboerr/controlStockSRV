export function validateLogin(req, res, next) {
  const { user, password } = req.body;
  if (!user || !password || password.length < 6) {
    return res.status(400).json({ success: false, message: "Datos inválidos" });
  }
  next();
}
