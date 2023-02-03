import { generateElement } from '@/utils';

const NotFound = () => {
  const NotFoundTemplate = generateElement(`
    <h1>404 Not Found!</h1>
  `);

  return NotFoundTemplate;
};

export default NotFound;
