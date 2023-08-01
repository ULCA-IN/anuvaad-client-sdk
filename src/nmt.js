import pipelineConfig from "../config/pipelineConfig.js";
import serviceId from "../config/serviceId.js";
import BaseApi from "./utils/baseApi.js";

const api = new BaseApi;

async function nmt(sourceLang, targetLang, sourceText) {

    const payload = {
        "pipelineTasks": [
            await pipelineConfig('translation', sourceLang, targetLang)

        ],
        "inputData": {
            "input": [
                {
                    "source": sourceText
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

export default nmt
