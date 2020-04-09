const future = (age, gap) => {
  return `In ${gap} years you will be ${Number(age)+gap}<br/>`;
}

module.exports = future;