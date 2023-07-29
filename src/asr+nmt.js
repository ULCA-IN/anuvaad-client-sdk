import serviceId from "../config/serviceId.js";
import axios from "axios";

import { authorizationToken } from "../config/verification.js";


async function asr_nmt(sourceLang, targetLang, base64) {
    const url = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline'
    let headers;
    if (authorizationToken) {
        headers = {
            'Authorization': authorizationToken,

            'Content-Type': 'application/json',
        }
    } else {
        console.log('no authentication detail passed')
        return 'no authentication detail passed'
    }


    const payload = {
        "pipelineTasks": [
            {
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": sourceLang
                    },
                    "serviceId": await serviceId("asr", sourceLang),
                    "audioFormat": "flac",
                    "samplingRate": 16000
                }
            },
            {
                "taskType": "translation",
                "config": {
                    "language": {
                        "sourceLanguage": sourceLang,
                        "targetLanguage": targetLang
                    },
                    "serviceId": await serviceId("translation", sourceLang, targetLang)
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
    return await axios.post(url, payload, { headers }).then(function (res) {
        const response = [
            res.data.pipelineResponse[0].output[0].source,
            res.data.pipelineResponse[1].output[0].target
        ]

        return response[1]   // will return target
    }).catch(function (error) {
        // console.error('Errors in asr+nmt:', error.response.data.detail.message);
        return error.response.data.detail.message  // this is correct need to update everywhere
    });
}

export default asr_nmt