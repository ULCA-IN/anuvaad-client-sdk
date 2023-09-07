/**
 * A class that provides methods to perform POST requests using Axios.
 * @class
 * @exports BaseApi
 */
import axios from "axios";
import { serviceUrl } from "../../config/config.js";
import { headers } from "../../config/verification.js";

/**
   * This class encapsulates the functionality to send POST requests using Axios.
   * create instances of the BaseApi class, which are initialized with default settings.
   * These instances enable the execution of POST requests using the `post` method.
   *
   * @constructor
   */

class BaseApi {
    /**
       * Send a POST request to the specified service URL with the provided data and headers.
       * Utilizes Axios to perform the request.
       * @async
       * @function
       * @param {Object} data - The payload to be sent in the request body.
       * @returns {Promise<Object>} A Promise that resolves to the response data if successful, or an error if unsuccessful.
       * @throws {Error} If there's an issue with the POST request or response.
       */
    async post(data) {
        try {
            return await axios.post(serviceUrl, data, { headers })

        } catch (err) {
            console.log(err);
            return err
        }
    }
}
export default BaseApi;