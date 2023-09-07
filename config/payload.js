/**
* @module payload
* @description This module provides functions to generate payloads for various translation function.
* A payload is a structured data object that contains the necessary input data and configuration parameters
* required to perform different translation tasks such as Automatic Speech Recognition (ASR), Neural Machine Translation (NMT),
* and Text-to-Speech (TTS). These functions assist in constructing payloads that can be sent to the server for processing.
*
* @exports asr_payload - Generates a payload for the ASR (Automatic Speech Recognition) module.
* @exports asr_nmt_payload - Generates a payload for the combined ASR and NMT (Neural Machine Translation) module.
* @exports asr_nmt_tts_payload - Generates a payload for the combined ASR, NMT, and TTS (Text-to-Speech) module.
* @exports nmt_payload - Generates a payload for the NMT (Neural Machine Translation) module.
* @exports nmt_tts_payload - Generates a payload for the combined NMT and TTS module.
* @exports tts_payload - Generates a payload for the TTS (Text-to-Speech) module.
*/

import pipelineConfig from "./pipelineConfig.js";

/**
 * Creates an input object for text-based input in the payload.
 * @function
 * @param {string} sourceText - The source text to be processed.
 * @returns {Object} The input object for text-based data.
 */

const input_text = (sourceText) => {
    return {
        "input": [
            {
                "source": sourceText
            }
        ]
    }
}
/**
 * Creates an input object for base64-encoded audio input in the payload.
 * @function
 * @param {string} base64 - The base64-encoded audio data.
 * @returns {Object} The input object for audio data.
 */
const input_base64 = (base64) => {
    return {

        "audio": [
            {
                "audioContent": base64
            }
        ]

    }
}
/**
 * Gets the TTS pipeline configuration with adjusted parameters.
 * @async
 * @function
 * @param {string} sourceLang - The source language.
 * @param {string} gender - The gender for TTS (male or female).
 * @returns {Promise<Object>} The adjusted TTS pipeline configuration.
 */

const getTtsPipeline = async (sourceLang, gender) => {
    let ttsPipeline = await pipelineConfig('tts', sourceLang);
    const { supportedVoices, ...configWithoutSupportedVoices } = ttsPipeline.config;

    ttsPipeline = {
        ...ttsPipeline,
        config: {
            language: { ...configWithoutSupportedVoices.language },
            serviceId: configWithoutSupportedVoices.serviceId,
            modelId: configWithoutSupportedVoices.modelId,
            gender: supportedVoices.includes(gender) ? gender : supportedVoices[0],
            "samplingRate": 8000
        }
    };

    return ttsPipeline;
};

/**
 * Generates the payload for ASR pipeline.
 * @async
 * @function
 * @param {string} sourceLang - The source language.
 * @param {string} base64 - The base64-encoded audio data.
 * @returns {Promise<Object>} The payload for ASR pipeline.
 */
// asr
export const asr_payload = async (sourceLang, base64) => {
    const asrPipeline = await pipelineConfig('asr', sourceLang);
    return {
        "pipelineTasks": [asrPipeline],
        "inputData": input_base64(base64)
    }
}
/**
 * Generates the payload for ASR and NMT pipeline.
 * @async
 * @function
 * @param {string} sourceLang - The source language.
 * @param {string} targetLang - The target language.
 * @param {string} base64 - The base64-encoded audio data.
 * @returns {Promise<Object>} The payload for ASR + NMT pipeline.
 */
// asr + nmt 
export const asr_nmt_payload = async (sourceLang, targetLang, base64) => {
    return {
        "pipelineTasks": [
            await pipelineConfig('asr', sourceLang),
            await pipelineConfig('translation', sourceLang, targetLang)
        ],
        "inputData": input_base64(base64)
    }
}
/**
 * Generates the payload for ASR, NMT, and TTS pipeline.
 * @async
 * @function
 * @param {string} sourceLang - The source language.
 * @param {string} targetLang - The target language.
 * @param {string} base64 - The base64-encoded audio data.
 * @param {string} gender - The gender for TTS (male or female).
 * @returns {Promise<Object>} The payload for ASR + NMT + TTS pipeline.
 */

// asr + nmt + tts
export const asr_nmt_tts_payload = async (sourceLang, targetLang, base64, gender) => {
    const asrPipeline = await pipelineConfig('asr', sourceLang);
    const translationPipeline = await pipelineConfig('translation', sourceLang, targetLang);
    const ttsPipeline = await getTtsPipeline(sourceLang, gender);

    return {
        "pipelineTasks": [asrPipeline, translationPipeline, ttsPipeline],
        "inputData": input_base64(base64)
    }
}
/**
 * Generates the payload for NMT pipeline.
 * @async
 * @function
 * @param {string} sourceLang - The source language.
 * @param {string} targetLang - The target language.
 * @param {string} sourceText - The source text to be translated.
 * @returns {Promise<Object>} The payload for NMT pipeline.
 */
// nmt
export const nmt_payload = async (sourceLang, targetLang, sourceText) => {
    const translationPipeline = await pipelineConfig('translation', sourceLang, targetLang);
    return {
        "pipelineTasks": [translationPipeline],
        "inputData": input_text(sourceText)
    }
}
/**
 * Generates the payload for NMT and TTS pipeline.
 * @async
 * @function
 * @param {string} sourceLang - The source language.
 * @param {string} targetLang - The target language.
 * @param {string} sourceText - The source text to be translated.
 * @param {string} gender - The gender for TTS (male or female).
 * @returns {Promise<Object>} The payload for NMT + TTS pipeline.
 */
// nmt + tts
export const nmt_tts_payload = async (sourceLang, targetLang, sourceText, gender) => {
    const translationPipeline = await pipelineConfig('translation', sourceLang, targetLang);
    const ttsPipeline = await getTtsPipeline(sourceLang, gender);

    return {
        "pipelineTasks": [translationPipeline, ttsPipeline],
        "inputData": input_text(sourceText)
    }
}
/**
 * Generates the payload for TTS (Text-to-Speech) pipeline.
 * @async
 * @function
 * @param {string} sourceLang - The source language.
 * @param {string} sourceText - The source text to be converted to speech.
 * @param {string} gender - The gender for TTS (male or female).
 * @returns {Promise<Object>} The payload for TTS pipeline.
 */
// tts
export const tts_payload = async (sourceLang, sourceText, gender) => {
    const ttsPipeline = await getTtsPipeline(sourceLang, gender);

    return {
        "pipelineTasks": [ttsPipeline],
        "inputData": input_text(sourceText)
    }

}

