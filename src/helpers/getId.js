const getId = async (model) => {
  const number = await model.estimatedDocumentCount();
  let text = (number + 1).toString();

  if (text.length < 4) {
    for (let i = 1; text.length < 4; i++) {
      text = "0" + text;
    }
  }
  return text;
};
module.exports = getId