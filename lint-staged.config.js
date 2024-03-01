module.exports = {
    // this will check Typescript files
    '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

    // This will format all supported files with Prettier
    '**/*.(ts|js|md|html)': (filenames) => `npx prettier --write ${filenames.join(' ')}`,

    // This will lint and format TypeScript and JavaScript files
    '**/*.(ts|js)': (filenames) => [
      `npx eslint --fix ${filenames.map((file) => `"${file}"`).join(' ')}`,
    ],
  };