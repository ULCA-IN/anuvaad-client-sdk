import BaseApi from "./utils/baseApi.js";
import { asr_nmt_tts_payload } from "../config/payload.js";

const api = new BaseApi()

async function asr_nmt_tts(sourceLang, targetLang, base64, gender) {

    const payload = await asr_nmt_tts_payload(sourceLang, targetLang, base64, gender);

    try {
        return await api.post(payload);

    } catch (error) {
        console.log('error in response', error)
    }
}

export default asr_nmt_tts