import BaseApi from "./utils/baseApi.js";
import { asr_nmt_payload } from "../config/payload.js";

const api = new BaseApi()

async function asr_nmt(sourceLang, targetLang, base64) {

    const payload = await asr_nmt_payload(sourceLang, targetLang, base64)

    try {
        const res = await api.post(payload);
        const response = [
            res.data.pipelineResponse[0].output[0].source,
            res.data.pipelineResponse[1].output[0].target
        ]
        return response[1]
    } catch (error) {
        console.log('error in response', error)
    }

}

export default asr_nmt