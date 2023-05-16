const security = require('../configs/security');

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = (allow) => async (req, res, next) => {
  if (allow && !req.headers.authorization) return next();

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Tipo de token inválido' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    await promisify(jwt.verify)(token, security.secret, security.expiresIn)
      .then((decoded) => (req.userId = decoded.id))
      .catch(() => {
        throw new Error('Token inválido');
      });

    return next();
  } catch (err) {
    return res.status(401).json({
      error: err.message ? err.message : 'Erro ao verificar token',
    });
  }
};
