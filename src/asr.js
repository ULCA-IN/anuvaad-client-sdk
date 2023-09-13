/**
 * @module Task-Type
 *  @description This section showcases various functions in the npm library, each catering to distinct translation tasks, accompanied by illustrative usage examples.
 * 
 */
import BaseApi from "./utils/baseApi.js";
import { asr_payload } from "../config/payload.js";

const api = new BaseApi;
/**
 * ASR (Automatic Speech Recognition) function for processing audio data.
 * This function sends audio data (base64) to the server for speech recognition.
 *
 * @async
 * @function
 * @param {string} sourceLang - The source language of the audio.
 * @param {string} base64 - The base64-encoded audio data in .wav format.
 * @returns {Promise<string>} The recognized text from the audio.
 *
 * @throws {Error} If there's an issue with the API request or response.
 * 
 * @example
 * import bhashini from 'bhashini-translation'
 * 
 * // Call the ASR function
 * const recognizedText = await bhashini.asr('en', 'base64EncodedAudioData');
 * console.log('Recognized Text:', recognizedText);
 */
async function asr(sourceLang, base64) {

    const payload = await asr_payload(sourceLang, base64)

    try {
        const res = await api.post(payload)
        return res.data.pipelineResponse[0].output[0].source;

    } catch (error) {
        console.log('error in response', error)
    }

}


export default asr


