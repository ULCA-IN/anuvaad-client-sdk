import serviceId from "../config/serviceId.js";
import axios from 'axios';
import { authorizationToken } from "../config/verification.js";


async function nmt_tts(sourceLang, targetLang, sourceText) {
    console.log('calling nmt+tts')
    const url = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline'
    let headers;

    if (authorizationToken) {
        headers = {
            'Authorization': authorizationToken,
            'Content-Type': 'application/json',
        }
    } else {
        // console.log('no authentication detail passed')
        return 'no authentication detail passed'
    }

    const payload = {
        "pipelineTasks": [
            {
                "taskType": "translation",
                "config": {
                    "language": {
                        "sourceLanguage": sourceLang,
                        "targetLanguage": targetLang
                    },
                    "serviceId": await serviceId('translation', sourceLang, targetLang)
                }
            },
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

    return await axios.post(url, payload, { headers }).then(function (res) {
        const response = [
            res.data.pipelineResponse[0].output[0].target,
            res.data.pipelineResponse[1].audio[0].audioContent
        ]
        let base64Sound = response[1];
        const audioData = atob(base64Sound);
        const arrayBuffer = new Uint8Array(audioData.length);

        for (let i = 0; i < audioData.length; i++) {
            arrayBuffer[i] = audioData.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
        const audioUri = URL.createObjectURL(blob);
        // console.log('response', audioUri)
        // return res.data.pipelineResponse[0].audio[0].audioContent  // returns base64
        return audioUri

        // return response
    }).catch(function (error) {
        console.error('Errors in nmt+tts:', error);
        return error.response.data.detail.message  // this is correct need to update everywhere
    });
}

export default nmt_tts;
