// exchangeDeps.js

var AnypointPlatformUtil = require('./AnypointPlatformUtil');
const fs = require('fs');
const path = require('path');

// globals
var myArgs = process.argv.slice(2);
var client;

//console.log('myArgs: ', myArgs);

if (myArgs.length > 1) {
   console.log ('USAGE: client_access_check.js <env.properties file>');
} else {
   console.log ('Processing ' + myArgs[0] + ' ...');
  
   // our program main 
   main(); 
} 

// -------------------------------------------------------------------------------------------------
// Application Main
//
function main() {
   var props; // hold our properties
 
   try { 
// etc ...project (clone)/etc/properties-files 
      props = fs.readFileSync('props/' + myArgs[0], 'utf8');
   } catch (err) {
      console.log('File does not exist!');
      return;
   }
   
   // process our properties file 
   client = getClientArtifact(myArgs[0]);
   console.log('client artifact -> ' + client);
   processFile(myArgs[0]);

   // proper form
   return; 

}

// -------------------------------------------------------------------------------------------------
// This utility function returns only the asset name from a given properties file
function getClientArtifact(fileName) {
   var asset;
   tmp = fileName.split('-env.');
   asset = tmp[0];
   return asset;   
}

// -------------------------------------------------------------------------------------------------
// This function processes the API's env property file looking for exchange dependencies
//
function processFile(fileName) {
   // readlines and check for httprequest or httpsrequest
   var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('props/' + fileName)
   });
   console.log('serving artifacts -> ...');
   lineReader.on('line', function (line) {
      var artifact = findArtifact(line);
      if (artifact != null) {
         // send artifact and request access
         console.log(artifact);

         // call function to obtain client ID and client Secret
         requestExchangeAccess(client, artifact);
      } else {
         return;
      }
   });
}

// -------------------------------------------------------------------------------------------------
// This function accepts a line of the property file and returns an exchange artifact if the API
// calling this module depends on other exchange API artifacts.
// 
function findArtifact(tmpLine) {
   var result;
   const substring1 = 'httpsrequest.basepath';
   const substring2 = 'httprequest.basepath';

   // look for substrings 
   if ((tmpLine.indexOf(substring1) !== -1) || (tmpLine.indexOf(substring2) !== -1)) {
      result = parseLineForArtifact(tmpLine);
   } else {
      result = null;
   }
 
   return result;
}

// -------------------------------------------------------------------------------------------------
// This function parses a found property file line (httpsrequest.basepath) and looks for an 
// exchange artifact in the value side of the key-value pair 
// e.g. bpr.document.papi.httpsrequest.basepath = /api/bpr-document-papi/v1/
//
function parseLineForArtifact(keyLine) {
   // split pair 
   var keyValueArray = keyLine.split('=');
   
   // use value  
   var value = keyValueArray[1];

   // remove any spaces
   value = value.replace(/\s+/g, '');
   //value = value.split(' ').join('');

   // note: even with spaces removed, array still looks like this ???
   // [ '', 'api', 'bpr-document-papi', 'v1', '' ]

   var pathArray = value.split('/');
   var artifact = pathArray[2];
 
   return artifact;
}

// -------------------------------------------------------------------------------------------------
// This function creates AnypointPlatformUtil object and runs a method to return a client ID and 
// client Secret for the Exchange API asset provided.
// 
function requestExchangeAccess(clientArtifact, servingArtifact) {
   // return a promise to get credentials
   anypointPlatformUtil = new anypointPlatformUtil(clientArtifact, servingArtifact);
   anypointPlatformUtil.getClientCredentials();
}
