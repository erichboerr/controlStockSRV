import sequelize from "../config/db.js";

export async function obtenerLogs(req, res, next) {
  try {
    const rows = await sequelize.query(
      "SELECT * FROM logs ORDER BY fecha DESC",
      { type: sequelize.QueryTypes.SELECT }
    );
    res.json(rows);
  } catch (err) {
    err.isCustom = true;
    err.httpStatus = 500;
    err.code = "DB_ERROR";
    next(err); // 👈 delegás al middleware
  }
}