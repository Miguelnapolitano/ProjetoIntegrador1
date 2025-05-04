import { ZodError } from 'zod'

class AppErro extends Error {
  statusCode;

  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const organizadorDeErros = (error, req, res, next) => {
  if (error instanceof AppErro) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: error.flatten().fieldErrors,
    });
  }

  return res.status(500).json({
    message: "Internal server error.",
  });
};

export { AppErro , organizadorDeErros };
