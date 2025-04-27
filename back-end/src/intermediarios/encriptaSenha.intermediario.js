import bcrypt from 'bcryptjs';

export const encriptaSenha = async (req, res, next) => {
  const saltos = await bcrypt.genSalt(10);
  req.body.senha = await bcrypt.hash(req.body.senha, saltos);
  return next();
};
