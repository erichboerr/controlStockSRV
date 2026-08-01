// Middleware genérico: valida req.body contra un schema de Joi.
// Uso: router.post("/", validate(miSchema), miController)
//
// abortEarly:false junta todos los errores de una (no solo el primero),
// así el frontend puede mostrarlos todos juntos si quiere.
// stripUnknown:true descarta campos que no están en el schema, en vez
// de rechazar el request entero por un campo de más.
export function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const detalle = error.details.map((d) => d.message).join("; ");
      return res.status(400).json({
        error: detalle,
        code: "VALIDATION_ERROR",
      });
    }

    req.body = value;
    next();
  };
}
