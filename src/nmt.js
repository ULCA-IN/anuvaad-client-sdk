import { nmt_payload } from "../config/payload.js";
import BaseApi from "./utils/baseApi.js";

const api = new BaseApi;

async function nmt(sourceLang, targetLang, sourceText) {

    const payload = await nmt_payload(sourceLang, targetLang, sourceText);

    try {
        return await api.post(payload);
    } catch (error) {
        console.log('error in response', error)
    }

}

export default nmt
