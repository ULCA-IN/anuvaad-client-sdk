import serviceId from "../config/serviceId.js";
import pipelineConfig from "../config/pipelineConfig.js";


async function nmt_tts(sourceLang, targetLang, sourceText) {

    const payload = {
        "pipelineTasks": [
            await pipelineConfig('translation', sourceLang, targetLang),
            {
                "taskType": "tts",
                "config": {
                    "language": {
                        "sourceLanguage": targetLang
                    },
                    "serviceId": await serviceId('tts', targetLang),
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

export default nmt_tts;
