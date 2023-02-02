const generateElement = (domString: string) => {
  const $temp = document.createElement('template');
  $temp.innerHTML = domString;

  return $temp.content;
};

export default function NotFound() {
  return generateElement(`
        <h1>404 Not Found!</h1>
      `);
}
