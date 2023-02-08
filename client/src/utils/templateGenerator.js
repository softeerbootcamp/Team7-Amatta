const generateElement = (domString) => {
  const template = document.createElement('template');
  template.innerHTML = domString;

  return template.content;
};

export default generateElement;
