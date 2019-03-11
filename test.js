// test.js

const apiService = require('./apiService');
const r = require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });

async function main() {
//    const stuff = await apiService.createApiManagerInstance('emp-xapi','1.0.0', 'c72db99c-a5a7-4c89-9d53-66512523f678');
//    console.info(stuff);

    const authtoken = await apiService.getToken();
    console.log('token:' + authtoken);

//    const orgId = await apiService.getOrganizationId(authtoken);
//    console.log('orgId:' + orgId);

//    const defaultEnvId = await apiService.getDefaultEnvironmentId(authtoken);
//    console.log('envId:' + defaultEnvId);

//    const created = await apiService.createClientApplication(authtoken, 'emp-xapi');
//    console.log(created);

//    const apps = await apiService.getApplications(authtoken);
//    console.log(apps);

 //   const appId = await apiService.getApplicationId(authtoken, 'emp-xapi');
 //   console.log('appId:' + appId);

 //   const deleted = await apiService.deleteApplication(authtoken, appId);
 //   console.log('HTTP Status:' + deleted.statusCode);

    const groups = await apiService.getExchangeGroups(authtoken); // need to get specific group
    console.log(groups);

//    const asset = await apiService.getExchangeAssetById(authtoken, 'c72db99c-a5a7-4c89-9d53-66512523f678', 'emp-xapi');
//    console.log(asset);

//    const apis = await apiService.getApis(authtoken);
//    console.log(apis);

//    const envapis = await apiService.getEnvApis(authtoken);
//    console.log(envapis);

//    const apiId = await apiService.getApiId(authtoken, 'emp-sapi');
//    console.log('apiId:' + apiId);

//    const versionId = await apiService.getVersionId(authtoken, apiId, 'v1');
//    console.log('versionId:' + versionId);

//    const contract = await apiService.createContractRequestingAccess(authtoken, apiId, versionId, appId);
//    console.log('clientId:' + contract[0]);
//    console.log('clientSecret:' + contract[1]);
}

main();
