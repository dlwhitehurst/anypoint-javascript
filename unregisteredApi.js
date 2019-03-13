/**
 * Create unregistered API Instance
 *
 * This module is used to create an unregistered API instance in API Manager using API calls from a
 * CI/CD Server environment using NodeJS to with the Mule Anypoint Platform.
 *
 * Options will be used so that the API instance can be created from scratch or imported from
 * Exchange.
 *
 * @link https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/
 * @file   unregisteredApi.js
 * @author David L. Whitehurst.
 * @since  1.0.0
 */

const minimist = require('minimist');
const consoleStamp = require('console-stamp');
const apiService = require('./apiService');

consoleStamp(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });

const args = minimist(process.argv.slice(2), {
  string: 'api', // -a emp-xapi
  alias: { a: 'client-props' },
});

/**
 * This main function is used to orchestrate the operations required to create an
 * unregistered MuleSoft API.
 *
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return null - returns nothing currently. May return a success code in the future.
 */
async function main() {
  const token = await apiService.getToken();
  const orgId = await apiService.getOrganizationId(token);
  const stuff = await apiService.createApiManagerInstance(args.a, '1.0.0', orgId);

  console.info(`anypoint-js 1.0.0: This id will overwrite the apiId that development set up in a property file. Id:${stuff}`);
}

main();
