const past = (age, gap) => {
  return `${gap} years ago you were ${Number(age)-gap}<br/>`;
};

module.exports = past;