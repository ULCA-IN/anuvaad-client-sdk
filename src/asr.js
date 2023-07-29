import serviceId from "../config/serviceId.js";
import axios from "axios";
import { authorizationToken } from "../config/verification.js";


async function asr(sourceLang, base64) {
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
                    // "serviceId": "ai4bharat/conformer-hi-gpu--t4",
                    "serviceId": await serviceId("asr", sourceLang),
                    "audioFormat": "flac",
                    "samplingRate": 16000
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
        // console.log('Response:', res.data.pipelineResponse[0].output[0].source);
        return res.data.pipelineResponse[0].output[0].source
    }).catch(function (error) {
        // console.error('Errors in asr:', error.response.data.detail.message);
        return error.response.data.detail.message  // this is correct need to update everywhere
    });
}



export default asr


