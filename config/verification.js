
let headers = {}
function auth(userid, apiKey, token) {
  headers = {
    'Authorization': token,
    'userID': userid,
    'ulcaApiKey': apiKey,
  };

}
export { headers }
export default auth;
