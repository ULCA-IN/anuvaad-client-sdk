import BaseApi from "./utils/baseApi.js";
import { nmt_tts_payload } from "../config/payload.js";
import getaudioUri from "./utils/audioUri.js";

const api = new BaseApi

async function nmt_tts(sourceLang, targetLang, sourceText, gender) {   // default is gender[0] --> generally female


    const payload = await nmt_tts_payload(sourceLang, targetLang, sourceText)

    try {
        const res = await api.post(payload);
        const response = [
            res.data.pipelineResponse[0].output[0].source,  // sourceText  [0]
            res.data.pipelineResponse[0].output[0].target, // translated text  [1]
            res.data.pipelineResponse[1].audio[0].audioContent // translated audio  [2]
        ]
        const base64Sound = response[2]
        return getaudioUri(base64Sound)

    } catch (error) {
        console.log('error in response', error)
    }

}

export default nmt_tts;
