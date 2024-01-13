module.exports = (theFunc) => (res, req, next) => {
  Promise.resolve(theFunc(res, req, next)).catch(next);
};