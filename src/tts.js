/**
 * @module Task-Type
 *  @description This section showcases various functions in the npm library, each catering to distinct translation tasks, accompanied by illustrative usage examples.
 * 
 */
import { tts_payload } from "../config/payload.js";
import BaseApi from "./utils/baseApi.js";
import getaudioUri from "./utils/audioUri.js";

const api = new BaseApi;
/**
 * TTS (Text-to-Speech) function for generating speech from text.
 * This function generates speech from the given text in the specified source language.
 *
 * @async
 * @function
 * @param {string} sourceLang - The source language of the text.
 * @param {string} sourceText - The text to be synthesized into speech.
 * @param {string} gender - The gender of the generated speech voice. Default is female generally.
 * @returns {Promise<string>} The audio URI containing the synthesized speech.
 *
 * @throws {Error} If there's an issue with the API request or response.
 *
 * @example
 * import bhashini from 'bhashini-translation';
 *
 * // Call the TTS function
 * const audioUri = await bhashini.tts('en', 'Hello, how are you?', 'female');
 * audioElement.src = audioUri;
 */
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
