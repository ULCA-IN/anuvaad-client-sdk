import serviceId from "../config/serviceId.js";
import BaseApi from "./utils/baseApi.js";
import pipelineConfig from "../config/pipelineConfig.js";

const api = new BaseApi;

async function asr(sourceLang, base64) {

    const payload = {
        "pipelineTasks": [

            await pipelineConfig('asr', sourceLang)
        ],
        "inputData": {
            "audio": [
                {
                    "audioContent": base64
                }
            ]
        }
    }

    try {
        return await api.post(payload);

    } catch (error) {
        console.log('error in response', error)
    }

}


export default asr


