/**
 * @module Task-Type
 *  @description This section showcases various functions in the npm library, each catering to distinct translation tasks, accompanied by illustrative usage examples.
 * 
 */
import BaseApi from "./utils/baseApi.js";
import { asr_nmt_tts_payload } from "../config/payload.js";
import getaudioUri from "./utils/audioUri.js";

const api = new BaseApi()
/**
 * ASR-NMT-TTS (Automatic Speech Recognition - Neural Machine Translation - Text-to-Speech) function for processing audio data.
 * This function performs ASR, NMT, and TTS to translate and generate speech for the audio data.
 *
 * @async
 * @function
 * @param {string} sourceLang - The source language of the audio.
 * @param {string} targetLang - The target language for translation.
 * @param {string} base64 - The base64-encoded audio data.
 * @param {string} gender - The gender of the generated speech voice. Default is female generally.
 * @returns {Promise<string>} The audio URI containing the synthesized speech in the target language.
 *
 * @throws {Error} If there's an issue with the API request or response.
 *
 * @example
 * import bhashini from 'bhashini-translation';
 *
 * // Call the ASR-NMT-TTS function
 * const audioUri = await bhashini.asr_nmt_tts('en', 'hi', 'base64EncodedAudioData', 'female');
 * audioElement.src = audioUri;
 */
async function asr_nmt_tts(sourceLang, targetLang, base64, gender) {

    const payload = await asr_nmt_tts_payload(sourceLang, targetLang, base64, gender);

    try {
        const res = await api.post(payload);
        const response = [
            res.data.pipelineResponse[0].output[0].source,  // sourceText  [0]
            res.data.pipelineResponse[1].output[0].target, // translated text  [1]
            res.data.pipelineResponse[2].audio[0].audioContent // translated audio  [2]
        ]
        const base64Sound = response[2]
        return getaudioUri(base64Sound)

    } catch (error) {
        console.log('error in response', error)
    }
}

export default asr_nmt_tts