const platformService = require('../platformService');
const apiService = require('../apiService');

describe('API Spec Suite', function () {
  // spec 1 
  it('should call getToken from apiService', function(done) {
    spyOn(apiService, 'getToken').and.returnValue(Promise.resolve('6e6060b1-c8cd-401f-a1a5-fad3c4495b64'));

    platformService.fetchToken()
      .then((result) => {
        expect(apiService.getToken).toHaveBeenCalled();
        expect(result).toEqual('6e6060b1-c8cd-401f-a1a5-fad3c4495b64');
        done();
      });
  });
  
  // spec 2 
  it('should call getOrganization from apiService', function(done) {
    spyOn(apiService, 'getOrganizationId').and.returnValue(Promise.resolve('c72db99c-a5a7-4c89-9d53-66512523f678'));
     
    platformService.fetchOrganizationId()
      .then((result) => {
         expect(apiService.getOrganizationId).toHaveBeenCalled();
         expect(result).toEqual('c72db99c-a5a7-4c89-9d53-66512523f678');
         done();
      });
  });

});

// 5680d673-df30-4400-9e30-c223c23abda6 e.g. access_token
// c72db99c-a5a7-4c89-9d53-66512523f678 e.g. organizationId
