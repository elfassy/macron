import pkg from '../package.json';

export const appPath = dir => {
  return (
    (process.env.NODE_ENV === 'development' ? `${__dirname}/..` : __dirname) +
    (dir ? `/${dir}` : '')
  );
};

export const app = () => null; // Electron app not available in renderer

export const version = () => pkg.version;
