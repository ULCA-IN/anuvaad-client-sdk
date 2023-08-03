import BaseApi from "./utils/baseApi.js";
import { asr_nmt_payload } from "../config/payload.js";

const api = new BaseApi()

async function asr_nmt(sourceLang, targetLang, base64) {

    const payload = await asr_nmt_payload(sourceLang, targetLang, base64)

    try {
        return await api.post(payload);
    } catch (error) {
        console.log('error in response', error)
    }

}

export default asr_nmt