import { tts_payload } from "../config/payload.js";
import BaseApi from "./utils/baseApi.js";
import getaudioUri from "./utils/audioUri.js";

const api = new BaseApi;
async function tts(sourceLang, sourceText, gender) {

    const payload = await tts_payload(sourceLang, sourceText, gender)

    try {
        const response = await api.post(payload);
        let base64Sound = response.data.pipelineResponse[0].audio[0].audioContent;
        return getaudioUri(base64Sound)
    } catch (error) {
        console.log('error in response', error)
    }

}
export default tts
