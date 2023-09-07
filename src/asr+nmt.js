/**
 * @module Task-Type
 *  @description This section showcases various functions in the npm library, each catering to distinct translation tasks, accompanied by illustrative usage examples.
 * 
 */
import BaseApi from "./utils/baseApi.js";
import { asr_nmt_payload } from "../config/payload.js";

const api = new BaseApi()
/**
 * ASR-NMT (Automatic Speech Recognition - Neural Machine Translation) function for processing audio data.
 * This function performs ASR and NMT on the audio data (base64) to translate it to the target language.
 *
 * @async
 * @function
 * @param {string} sourceLang - The source language of the audio.
 * @param {string} targetLang - The target language for translation.
 * @param {string} base64 - The base64-encoded audio data.
 * @returns {Promise<string>} The translated text in the target language.
 *
 * @throws {Error} If there's an issue with the API request or response.
 *
 * @example
 * import bhashini from 'bhashini-translation';
 *
 * // Call the ASR-NMT function
 * const translatedText = await bhashini.asr_nmt('en', 'hi', 'base64EncodedAudioData');
 * console.log('Translated Text:', translatedText);
 */
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