/**
 * @module Task-Type
 *  @description This section showcases various functions in the npm library, each catering to distinct translation tasks, accompanied by illustrative usage examples.
 * 
 */
import BaseApi from "./utils/baseApi.js";
import { nmt_tts_payload } from "../config/payload.js";
import getaudioUri from "./utils/audioUri.js";

const api = new BaseApi
/**
 * NMT-TTS (Neural Machine Translation - Text-to-Speech) function for translating text and generating speech.
 * This function performs NMT and TTS to translate text and generate speech in the target language.
 *
 * @async
 * @function
 * @param {string} sourceLang - The source language of the text.
 * @param {string} targetLang - The target language for translation and speech generation.
 * @param {string} sourceText - The text to be translated and synthesized into speech.
 * @param {string} gender - The gender of the generated speech voice. Default is female generally.
 * @returns {Promise<string>} The audio URI containing the synthesized speech in the target language.
 *
 * @throws {Error} If there's an issue with the API request or response.
 *
 * @example
 * import bhashini from 'bhashini-translation';
 *
 * // Call the NMT-TTS function
 * const audioUri = await bhashini.nmt_tts('en', 'fr', 'Hello, how are you?', 'female');
 * audioElement.src = audioUri;
 */
async function nmt_tts(sourceLang, targetLang, sourceText, gender) {


    const payload = await nmt_tts_payload(sourceLang, targetLang, sourceText, gender)

    try {
        const res = await api.post(payload);
        const response = [
            res.data.pipelineResponse[0].output[0].source,  // sourceText  [0]
            res.data.pipelineResponse[0].output[0].target, // translated text  [1]
            res.data.pipelineResponse[1].audio[0].audioContent // translated audio  [2]
        ]
        const base64Sound = response[2]
        return getaudioUri(base64Sound)

    } catch (error) {
        console.log('error in response', error)
    }

}

export default nmt_tts;
