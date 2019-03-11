/**
 * Anypoint Platform API Module
 *
 * This module is used to perform Anypoint Platform API calls from a CI/CD Server
 * environment using NodeJS.
 *
 * @link https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/
 * @file   apiService.js
 * @author David L. Whitehurst.
 * @since  1.0.0
 */

/*jshint strict:false */

const constants = require('./constants.js');
const fetch = require('node-fetch');
const request = require('request-promise');

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP POST to:
 *    https://anypoint.mulesoft.com/accounts/login
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to a string e.g. 5b2f78c9-3c43-4c24-9b22-8139d4ccc4fb.
 */
async function getToken() {
    const options = {
        method: 'POST',
        uri: 'https://anypoint.mulesoft.com/accounts/login',
        //proxy: 'http://proxy.corp.fin:8080',
        body: constants.credentials,
        headers: { 'Content-Type': 'application/json' },
        json: true,
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data.access_token;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP GET to:
 *    https://anypoint.mulesoft.com/accounts/api/me
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to a string e.g. c72db99c-a5a7-4c89-9d53-66512523f678
 */
async function getOrganizationId(token) {
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/accounts/api/me',
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true,
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data.user.organizationId;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP GET to:
 *    https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/{orgId}/environments/default
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to a string e.g. ae58bace-7f16-4804-a53f-20acefe7d6ad.
 */
async function getDefaultEnvironmentId(token) {
    const orgId = await getOrganizationId(token);
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/'
        + orgId + '/environments/default',
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true,
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data.id;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP GET to:
 *    https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/{orgId}/environments
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to JSON array of environments.
 */
async function getEnvironments(token) {
    const orgId = await getOrganizationId(token);
    const data = await fetch('https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/' + this.orgId + '/environments' , {
        method: 'get',
        headers: { 'Authorization': 'bearer ' + this.token }
    })
        .then (res => res.json())
        .catch(error => console.log(error));
    return data;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP GET to:
 *    https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/{orgId}/applications
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to a JSON array of applications.
 */
async function getApplications(token) {
    const orgId = await getOrganizationId(token);
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/' + orgId + '/applications',
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true,
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP GET to:
 *    https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/{orgId}/apis
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to a JSON array of APIs.
 */
async function getApis(token) {
    const orgId = await getOrganizationId(token);
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/' +
        orgId + '/apis',
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP GET to:
 *    https://anypoint.mulesoft.com/apimanager/api/v1/organizations/{orgId}/environments/{envId}/apis
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to a JSON array of APIs.
 */
async function getEnvApis(token) {
    const orgId = await getOrganizationId(token);
    const envId = await getDefaultEnvironmentId(token);
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/apimanager/api/v1/organizations/' +
        orgId + '/environments/' + envId + '/apis',
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true
    }

    return await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

}

async function getExchangeGroups(token) {
// https://anypoint.mulesoft.com/exchange/api/v1/organizations/{organizationId}/groups
    const orgId = await getOrganizationId(token);
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/exchange/api/v1/organizations/' + orgId + '/groups',
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true
    };

    return await request(options)
        .then (function (response) {
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });
}

async function getExchangeAssetById(token, groupId, assetId) {
// https://anypoint.mulesoft.com/exchange/api/v1/assets/{groupId}/{assetId}
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/exchange/api/v1/assets/' + groupId + '/' + assetId,
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true
    };

    return await request(options)
        .then (function (response) {
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });
}

async function getExchangeAssets(token) {
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/exchange/api/v1/assets/',
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true
    }

    const data = await request(options)
        .then (function (response) {
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data;
}
/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP POST to:
 *    https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/{orgId}/applications
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to a newly created JSON object or application.
 */
async function createClientApplication(token, clientName) {
    let posting = constants.clientAppPostPart1 +
        clientName +
        constants.clientAppPostPart2 +
        clientName +
        constants.clientAppPostPart3;
    const orgId = await getOrganizationId(token);
    const options = {
        method: 'POST',
        uri: 'https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/' +
        orgId + '/applications',
        //proxy: 'http://proxy.corp.fin:8080',
        body: JSON.parse(posting),
        headers: { 'Authorization': 'bearer ' + token , 'Content-Type': 'application/json' },
        json: true,
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })

        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP DELETE to:
 *    https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/{orgId}/applications/{appId}
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return {Promise} - returns a Promise, resolves to undefined body, status 204 No Content.
 */
async function deleteApplication(token, appId) {
    const orgId = await getOrganizationId(token);
    const options = {
        method: 'DELETE',
        uri: 'https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/' +
        orgId + '/applications/' + appId,
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        resolveWithFullResponse: true
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP POST to:
 *    https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/{orgId}/applications/{applicationId}/contracts
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return Promise - returns a Promise (pending resolve() or reject()).
 */
async function createContractRequestingAccess(token, apiId, versionId, applicationId) {
    let creds;
    let posting = '{"apiVersionId": ' + versionId  + ',"applicationId":' + apiId + ',"partyId": "","partyName": "", "requestedTierId":null, "acceptedTerms": false}';
    const orgId = await getOrganizationId(token);
    const options = {
        method: 'POST',
        uri: 'https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/' +
        orgId + '/applications/' + applicationId + '/contracts',
        //proxy: 'http://proxy.corp.fin:8080',
        body: JSON.parse(posting),
        headers: { 'Authorization': 'bearer ' + token , 'Content-Type': 'application/json' },
        json: true,
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    creds = new Array(data.application.clientId, data.application.clientSecret);
    return creds;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes a call to local function getApplications to obtain an array of client applications.
 * The id is returned from the array element matching the applicationName.
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return Promise - returns a Promise (pending resolve() or reject()).
 */
async function getApplicationId(token, applicationName) { // e.g. test-client
    let appId;
    const data = await getApplications(token);
    for ( let i=0; i< data.applications.length; i++) {
        let obj = data.applications[i];
        if (obj.name.valueOf() === applicationName) {
            appId = obj.id;
        }
    }
    return appId;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes a call to local function getEnvApis to obtain an array of API assets. The id is
 * returned from the array element matching the apiName.
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return Promise - returns a Promise (pending resolve() or reject()).
 */

async function getApiId(token, apiName) {
    let apiId;
    const data = await getEnvApis(token);
    for ( let i=0; i< data.assets.length; i++) {
        const obj = data.assets[i];
        if (obj.assetId.valueOf() === apiName) {
            apiId = obj.id;
        }
    }

    return apiId;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes an HTTP GET to:
 *    https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/{orgId}/apis/{apiId}
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return Promise - returns a Promise (pending resolve() or reject()).
 */

async function getApi(token, apiId) {
    const orgId = await getOrganizationId(token);
    const options = {
        method: 'GET',
        uri: 'https://anypoint.mulesoft.com/apiplatform/repository/v2/organizations/' + orgId + '/apis/' + apiId,
        //proxy: 'http://proxy.corp.fin:8080',
        headers: { 'Authorization': 'bearer ' + token },
        json: true,
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

    return data;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes a call to local method getApi for an array of versions for the API given. The
 * function returns the id of the version specified by productVersion.
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return Promise - returns a Promise (pending resolve() or reject()).
 */

async function getVersionId(token, apiId, productVersion) {
    let versionId;
    const data = await getApi(token, apiId);
    for ( let i=0; i< data.versions.length; i++) {
        const obj = data.versions[i];
        if (obj.productVersion.valueOf() === productVersion) {
            versionId = obj.id;
        }
    }

    return versionId;
}

/**
 * This asynchronous function is used to call the Anypoint Platform API for administration and management
 *
 * The function makes a call to the API Manager API to POST a request to create a new API Manager
 * instance and return the appId. 
 *
 * ... all for the service account user (see constants.js).
 *
 * @author David L. Whitehurst.
 * @since  1.0.0
 *
 * @return Promise - returns a Promise, resolves to a string id.
 */

async function createApiManagerInstance(assetId, version, groupId) {
   let posting = '{"endpoint": { "type": "rest-api", "uri": "http://google.com", "proxyUri": null, "muleVersion4OrAbove": true, "isCloudHub": false }, "instanceLabel": "' + assetId  + '","spec": { "assetId": "' + assetId + '", "version": "' + version + '", "groupId": "' + groupId +'" }}';
   const token = await getToken(); 
   const orgId = await getOrganizationId(token);
   const envId = await getDefaultEnvironmentId(token);
   const options = {
        method: 'POST',
        uri: 'https://anypoint.mulesoft.com/apimanager/api/v1/organizations/' + orgId + '/environments/' + envId + '/apis',
        //proxy: 'http://proxy.corp.fin:8080',
        body: JSON.parse(posting),
        headers: { 'Authorization' : 'bearer ' + token, 'Content-Type': 'application/json' },
        json: true,
    }

    const data = await request(options)
        .then (function (response) {
            // Request was successful, use the response object at will
            return response;
        })
        .catch (function(err) {
            console.log(err);
            return err;
        });

   return data.id;
}

/**
 * Node Module Exports
 */

module.exports = {
    getToken,
    getOrganizationId,
    getDefaultEnvironmentId,
    getEnvironments,
    getApplications,
    getApis,
    getEnvApis,
    createClientApplication,
    deleteApplication,
    createContractRequestingAccess,
    getApplicationId,
    getVersionId,
    getApiId,
    getApi,
    createApiManagerInstance,
    getExchangeAssets,
    getExchangeAssetById,
    getExchangeGroups
};
