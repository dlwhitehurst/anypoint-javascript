// apiService.test.js

const apiService = require('../apiService');

function main() {
  it('returns a token id and not a null.', async () => {
    const token = await apiService.getToken();
    expect(token).not.toBe(null);
  });

  it('returns an organization id and not a null.', async () => {
    const token = await apiService.getToken();
    const orgId = await apiService.getOrganizationId(token);
    expect(orgId).not.toBe(null);
  });
}

main();
