require('dotenv').config();

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = (allow) => async (req, res, next) => {
  if (allow && !req.headers.authorization) return next();

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET).catch(
      (err) => {
        throw new Error({
          message: err.message ? err.message : 'Erro ao verificar token',
        });
      },
    );
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
