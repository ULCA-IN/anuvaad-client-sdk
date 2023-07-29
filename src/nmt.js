import serviceId from "../config/serviceId.js";
import axios from "axios";
import { authorizationToken } from "../config/verification.js";

async function nmt(sourceLang, targetLang, sourceText) {
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
            "input": [
                {
                    "source": sourceText
                }
            ]
        }
    }
    try {


        return await axios.post(url, payload, { headers })
            .then(function (res) {
                // console.log('Response:', res.data.pipelineResponse[0].output[0].target);
                return res.data.pipelineResponse[0].output[0].target
            })
            .catch(function (error) {
                console.error('Errors in nmt:', error.response.data.detail.message);
                return error.response.data.detail.message
            });
    } catch (error) {

        return { Message: 'error in nmt http request' }
    }
}

export default nmt
