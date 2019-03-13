/**
 * Anypoint Platform Javascript Library
 *
 * This module is used to provide constants for the Anypoint Platform Javascript
 * Library using NodeJS.
 *
 * @link https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/
 * @file   constants.js
 * @author David L. Whitehurst.
 * @since  1.0.0
 */

// constants.js
const credentials = { username: 'dlw-ms3-2', password: 'Leche4Moi2Consume' };

const clientAppPostPart1 = '{"redirectUri": ["http://localhost"], "apiEndpoints": false, "name":"';
const clientAppPostPart2 = '","description": "Client API Application", "url":"http://localhost/api/';
const clientAppPostPart3 = '/v1"}';

module.exports = {
  credentials,
  clientAppPostPart1,
  clientAppPostPart2,
  clientAppPostPart3,
};
