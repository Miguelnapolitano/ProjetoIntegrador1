
export const validarRequisicao = (schema) => (req, res, next) => {
  const validatedData = schema.parse(req.body);

  req.body = validatedData;

  return next();
};
