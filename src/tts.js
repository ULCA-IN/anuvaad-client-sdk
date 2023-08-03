import { tts_payload } from "../config/payload.js";
import BaseApi from "./utils/baseApi.js";

const api = new BaseApi;
async function tts(sourceLang, sourceText, gender) {

    const payload = await tts_payload(sourceLang, sourceText, gender)

    try {
        return await api.post(payload);

    } catch (error) {
        console.log('error in response', error)
    }

}
export default tts
