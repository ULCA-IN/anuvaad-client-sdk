import serviceId from "../config/serviceId.js";
import BaseApi from "./utils/baseApi.js";
import pipelineConfig from "../config/pipelineConfig.js";

const api = new BaseApi()

async function asr_nmt_tts(sourceLang, targetLang, base64) {

    const payload = {
        "pipelineTasks": [
            await pipelineConfig('asr', sourceLang),
            await pipelineConfig('translation', sourceLang, targetLang),
            {
                "taskType": "tts",
                "config": {
                    "language": {
                        "sourceLanguage": targetLang
                    },
                    "serviceId": await serviceId("tts", targetLang),
                    "gender": "female",
                    "samplingRate": 8000
                }
            }
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

export default asr_nmt_tts