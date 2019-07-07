const inputRequired = (name) => {
  return (value) => (/.+/.test(value) ? true : `${name} is required`);
};
module.exports = { inputRequired };
