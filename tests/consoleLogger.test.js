// consoleLogger.test.js

const handle = require('../consoleLogger');

it('should return a zero from main, ensuring success status', () => {
  const result = handle.main();
  expect(result).toBe(0);
});
