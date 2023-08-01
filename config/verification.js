
// let authorizationToken, userid, ulcaApikey;
let headers = {}
// const token = 'hACDedKF03_rRl6dRcmcipqfE5GxfJrIdflv7PppXdA7Bv4CLA5aDYP-rZfGY1mG';
// const userid = '9083a5240ddc473ba1e706b7df47c7a0'
// const apiKey = '25e21b8af7-4d7a-4d29-89d4-6d7a3e745e12'
function auth(userid, apiKey, token) {
  headers = {
    'Authorization': token,
    'userID': userid,
    'ulcaApiKey': apiKey,
  };

}
export { headers }
export default auth;
