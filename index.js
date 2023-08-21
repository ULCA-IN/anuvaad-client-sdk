/**
 * Main module for the Bhashini Translation Library.
 * This module serves as the entry point to the Bhashini Translation Library and provides access to various translation functionalities.
 * 
 * @module bhashini-translation
 */
import nmt from "./src/nmt.js";
import asr from "./src/asr.js";
import tts from "./src/tts.js";
import nmt_tts from "./src/nmt+tts.js";
import asr_nmt from "./src/asr+nmt.js";
import asr_nmt_tts from "./src/asr+nmt+tts.js";
import auth from "./config/verification.js";

/**
 * The main Bhashini Translation Library module.
 *
 * @namespace bhashini
 * @type {Object}
 * @property {function} asr - Module for Automatic Speech Recognition.
 * @property {function} nmt - Module for Neural Machine Translation.
 * @property {function} tts - Module for Text-to-Speech.
 * @property {function} nmt_tts - Combined module for NMT and TTS.
 * @property {function} asr_nmt - Combined module for ASR and NMT.
 * @property {function} asr_nmt_tts - Combined module for ASR, NMT, and TTS.
 * @property {Function} auth - Handles the authentication process and sets up necessary credentials.
 */
// console.log("running main function from bhashini-translation library")

/**
 * The main Bhashini Translation Library object.
 *
 * @type {Object}
 * @alias module:bhashini-translation
 * @memberof module:bhashini-translation
 */
const bhashini = {
    asr,
    nmt,
    tts,
    nmt_tts,
    asr_nmt,
    asr_nmt_tts,
    auth,

}

export default bhashini;
