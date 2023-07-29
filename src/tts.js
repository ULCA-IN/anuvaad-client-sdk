import serviceId from "../config/serviceId.js";
import axios from 'axios'
import { authorizationToken } from "../config/verification.js";

async function tts(srcLang, sourceText) {
    const url = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline"
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


        return await axios.post(url, payload, { headers })
            .then(
                (res) => {

                    // console.log(res.data.pipelineResponse[0].audio[0])
                    let base64Sound = res.data.pipelineResponse[0].audio[0].audioContent;
                    const audioData = atob(base64Sound);
                    const arrayBuffer = new Uint8Array(audioData.length);

                    for (let i = 0; i < audioData.length; i++) {
                        arrayBuffer[i] = audioData.charCodeAt(i);
                    }

                    const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
                    const audioUri = URL.createObjectURL(blob);
                    console.log('response', audioUri)
                    // return res.data.pipelineResponse[0].audio[0].audioContent  // returns base64
                    return audioUri

                }
            ).catch(function (error) {
                console.error('Errors in tts:', error);
                return error.response.data.detail.message
            });
    } catch (error) {
        return 'error in tts http request'
    }
}
tts('en', 'i am going')
export default tts
