/**
*  The authentication headers object used for making translation requests.
* @type {Object}
* @property {string} Authorization - The authorization token for authentication.
* @property {string} userID - The userID associated with the authentication.
* @property {string} ulcaApiKey - The ULCA API key for authentication.
* */
let headers = {}
/**
 * Set authentication headers for making translation requests.
 * @function
 * @param {string} userid - The user ID associated with the authentication. 
 * @param {string} apiKey - The ULCA API key for authentication. 
 * @param {string} token - The authorization token for authentication. 
 * @returns {void}
 */
function auth(userid, apiKey, token) {

  headers = {
    'Authorization': token,
    'userID': userid,
    'ulcaApiKey': apiKey,
  };

}
export { headers }
export default auth;
