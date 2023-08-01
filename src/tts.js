import serviceId from "../config/serviceId.js";
import BaseApi from "./utils/baseApi.js";

const api = new BaseApi;
async function tts(srcLang, sourceText) {

    const payload = {
        "pipelineTasks": [
            {
                "taskType": "tts",
                "config": {
                    "language": {
                        "sourceLanguage": srcLang

                    },
                    "serviceId": await serviceId('tts', srcLang),
                    "gender": "female",
                    "samplingRate": 8000
                }
            }
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
export default tts
