import axios from "axios";
import { serviceUrl } from "../../config/config.js";
import { headers } from "../../config/verification.js";
class BaseApi {
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