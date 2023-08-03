import BaseApi from "./utils/baseApi.js";
import { nmt_tts_payload } from "../config/payload.js";


const api = new BaseApi

async function nmt_tts(sourceLang, targetLang, sourceText, gender) {   // default is gender[0] --> generally female


    const payload = await nmt_tts_payload(sourceLang, targetLang, sourceText)
    console.log("payload: ", payload)

    try {
        return await api.post(payload);

    } catch (error) {
        console.log('error in response', error)
    }

}

export default nmt_tts;
