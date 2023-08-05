import BaseApi from "./utils/baseApi.js";
import { asr_nmt_tts_payload } from "../config/payload.js";
import getaudioUri from "./utils/audioUri.js";

const api = new BaseApi()

async function asr_nmt_tts(sourceLang, targetLang, base64, gender) {

    const payload = await asr_nmt_tts_payload(sourceLang, targetLang, base64, gender);

    try {
        const res = await api.post(payload);
        const response = [
            res.data.pipelineResponse[0].output[0].source,  // sourceText  [0]
            res.data.pipelineResponse[1].output[0].target, // translated text  [1]
            res.data.pipelineResponse[2].audio[0].audioContent // translated audio  [2]
        ]
        const base64Sound = response[2]
        return getaudioUri(base64Sound)

    } catch (error) {
        console.log('error in response', error)
    }
}

export default asr_nmt_tts