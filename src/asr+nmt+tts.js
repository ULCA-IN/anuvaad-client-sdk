import serviceId from "../config/serviceId.js";
import axios from "axios";
import { authorizationToken } from "../config/verification.js";


async function asr_nmt_tts(sourceLang, targetLang, base64) {
    const url = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline'
    let headers;
    if (authorizationToken) {
        headers = {
            'Authorization': authorizationToken,

            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    } else {
        console.log('no authentication detail passed')
        return 'no authentication detail passed'
    }
    console.log('base64 from package:', base64)
    console.log(typeof base64)

    const payload = {
        "pipelineTasks": [
            {
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": sourceLang
                    },
                    "serviceId": await serviceId('asr', sourceLang),
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
                    "serviceId": await serviceId('translation', sourceLang, targetLang)
                }
            },
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
    return await axios.post(url, payload, { headers }).then(function (res) {
        console.log('under post method')
        const response = [
            res.data.pipelineResponse[0].output[0].source,  // sourceText  [0]
            res.data.pipelineResponse[1].output[0].target, // translated text  [1]
            res.data.pipelineResponse[2].audio[0].audioContent // translated audio  [2]
        ]
        let base64Sound = response[2];
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

        // return response   // will return source, source translation & translated audio
    }).catch(err => {
        // console.log('error function of api')
        // console.log('error:', err)
        return err
    }).catch(function (error) {
        // console.error('Errors in asr+nmt+tts:', error.response.data.detail.message);
        // return error.response.data.detail.message  
        return error.response
    });
}

export default asr_nmt_tts