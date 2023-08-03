import BaseApi from "./utils/baseApi.js";
import { asr_payload } from "../config/payload.js";

const api = new BaseApi;

async function asr(sourceLang, base64) {

    const payload = await asr_payload(sourceLang, base64)

    try {
        return await api.post(payload);

    } catch (error) {
        console.log('error in response', error)
    }

}


export default asr


