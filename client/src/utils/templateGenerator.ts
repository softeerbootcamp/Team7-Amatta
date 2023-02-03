const generateElement = (domString: string): DocumentFragment => {
  const template = document.createElement('template');
  template.innerHTML = domString;

  return template.content;
};

export default generateElement;
