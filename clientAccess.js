/**
 * Client and Request Access to Exchange Assets
 *
 * This module is used to perform create client and obtain access API calls from a CI/CD Server
 * environment using NodeJS to Mule Anypoint Platform to align with clientId and clientSecret
 * API policies.
 *
 * @link https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/
 * @file   clientAccess.js
 * @author David L. Whitehurst.
 * @since  1.0.0
 */

const readline = require('readline');
const fs = require('fs');
// const path = require('path');
const minimist = require('minimist');
// const shell = require('shelljs');
const apiService = require('./apiService');
require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });

let client;

const args = minimist(process.argv.slice(2), {
  string: 'client-props', // -c emp-xapi-env.properties
  alias: { c: 'client-props' },
});


/**
 * This function returns a string namespace of the artifact or MuleSoft API being managed for
 * deployment. e.g. emp-payroll-xapi
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return string - name of artifact being administered or in-process deployment
 */
function getClientArtifact(fileName) {
  const tmp = fileName.split('-env.');
  return tmp[0];
}


/**
 * This function checks a file line for 'client.id' and ignores commented lines.
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return boolean - returns true or false based on the existence of clientId enforcement.
 */
function findClientIdEnforcement(tmpLine) {
  const substring = 'client.id';
  if ((tmpLine.indexOf(substring) !== -1) && (tmpLine.indexOf('#') === -1)) {
    return true;
  }
  return null;
}


/**
 * This function splits a property line and returns a unique piece of the value.
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return string - returns true or false based on the existence of clientId enforcement.
 */
function parseLineForArtifact(keyLine) {
  const keyValueArray = keyLine.split('=');
  let value = keyValueArray[1];
  value = value.replace(/\s+/g, '');
  const pathArray = value.split('/');
  return pathArray[2];
}

/**
 * This async function calls upon other async functions within apiService
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return string - returns true or false based on the existence of clientId enforcement.
 */
async function requestExchangeAccess(clientArtifact, servingArtifact) {
  console.info(`anypoint-js 1.0.0: function -> requestExchangeAccess for ${clientArtifact} of ${servingArtifact} only after checking for client application first.`);
  const clientAppName = `${clientArtifact}-int`;
  const token = await apiService.getToken();
  const result = await apiService.isClientApplicationByName(token, clientAppName);

  if (result) {
    const creds = await apiService.createContractWithAsset(token, clientAppName, servingArtifact);
    console.info(`anypoint-js 1.0.0: clientId:${creds[0]}`);
    console.info(`anypoint-js 1.0.0: clientSecret:${creds[1]}`);
  } else {
    await apiService.createClientApplication(token, clientAppName);
    console.info(`anypoint-js 1.0.0: created -> client Application -> ${clientAppName}`);
    const creds = await apiService.createContractWithAsset(token, clientAppName, servingArtifact);
    console.info(`anypoint-js 1.0.0: clientId:${creds[0]}`);
    console.info(`anypoint-js 1.0.0: clientSecret:${creds[1]}`);
  }
}


/**
 * This function checks a file line for 'httprequest.basepath' or 'httpsrequest.basepath'
 * and ignores commented lines.
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return boolean - returns true or false based on the existence of clientId enforcement.
 */
function findHttpRequests(tmpLine) {
  let result;
  const substring1 = 'httpsrequest.basepath';
  const substring2 = 'httprequest.basepath';

  // look for substrings
  if (((tmpLine.indexOf(substring1) !== -1) || (tmpLine.indexOf(substring2) !== -1)) && (tmpLine.indexOf('#') === -1)) {
    result = parseLineForArtifact(tmpLine);
  } else {
    result = null;
  }

  return result;
}

/**
 * This function asynchronously reads a property file line-by-line and calls out to
 * another function to look for specific text occurrences.
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - unknown yet
 */
async function checkHttpRequests(fileName) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(`props/${fileName}`);

    const rl = readline.createInterface({
      input: stream,
    });

    rl.on('line', (line) => {
      const artifact = findHttpRequests(line);
      if (artifact != null) {
        console.info(`anypoint-js 1.0.0: dependency asset -> ${artifact}`);
        requestExchangeAccess(client, artifact);
      }
    }).on('close', () => {
      // do nothing
      // resolve('finished with ' + args.c + ' ...');
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * This function asynchronously reads a property file line-by-line and calls out to
 * another function to look for specific text occurrences.
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - resolves to occurrence count of 'client.id'.
 */
async function checkClientId(fileName) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const stream = fs.createReadStream(`props/${fileName}`);

    const rl = readline.createInterface({
      input: stream,
    });

    rl.on('line', (line) => {
      const result = findClientIdEnforcement(line);
      if (result) {
        count += 1;
      }
    }).on('close', () => {
      resolve(count);
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * This function is used to process the incoming property file.
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return boolean - returns true or false based on the existence of clientId enforcement.
 */
async function processFile(fileName) {
  const occurrences = await checkClientId(fileName);

  if (occurrences > 0) {
    console.info(`anypoint-js 1.0.0: processing -> ${occurrences} occurrence(s)`);
    await checkHttpRequests(fileName);
  } else {
    console.info('anypoint-js 1.0.0: exiting ...');
  }
}

/**
 * This main function is used to orchestrate the operations required to assure each
 * deployed MuleSoft API has a client application and clientId/clientSecret if dependent
 * on other Exchange Assets (APIs).
 *
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return null - returns nothing currently. May return a success code in the future.
 */
function main() {
  if (!args.c) {
    return null;
  }

  console.info(`anypoint-js 1.0.0: property File -> ${args.c} for possible API Policy adherence.`);

  client = getClientArtifact(args.c);
  console.info(`anypoint-js 1.0.0: client artifact -> ${client}`);

  processFile(args.c);

  return 0;
}

main();
