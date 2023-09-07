/**
 * @module Task-Type
 *  @description This section showcases various functions in the npm library, each catering to distinct translation tasks, accompanied by illustrative usage examples.
 * 
 */
import { nmt_payload } from "../config/payload.js";
import BaseApi from "./utils/baseApi.js";

const api = new BaseApi;
/**
 * NMT (Neural Machine Translation) function for translating text.
 * This function translates text from the source language to the target language.
 *
 * @async
 * @function
 * @param {string} sourceLang - The source language of the text.
 * @param {string} targetLang - The target language for translation.
 * @param {string} sourceText - The text to be translated.
 * @returns {Promise<string>} The translated text in the target language.
 *
 * @throws {Error} If there's an issue with the API request or response.
 *
 * @example
 * import bhashini from 'bhashini-translation';
 *
 * // Call the NMT function
 * const translatedText = await bhashini.nmt('en', 'hi', 'Hello, how are you?');
 * console.log('Translated Text:', translatedText);
 */
async function nmt(sourceLang, targetLang, sourceText) {

    const payload = await nmt_payload(sourceLang, targetLang, sourceText);

    try {
        const response = await api.post(payload);
        return response.data.pipelineResponse[0].output[0].target
    } catch (error) {
        console.log('error in response', error)
    }

}

export default nmt
