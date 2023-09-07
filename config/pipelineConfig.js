/**
 * Module for dynamically configuring translation pipeline tasks using the provided task type and language settings.
 * This module constructs and sends a POST request to retrieve pipeline configurations from the server.
 * The retrieved configurations are then utilized to generate appropriate payloads for various translation tasks.
 *
 * @module pipelineConfig
 */
import axios from "axios";
import { getModelurl } from "./config.js";
import { headers } from "./verification.js";
import getTasktypeconfig from "./tasktypeConfig.js"


/**
 * Asynchronously fetches and constructs pipeline configurations for translation tasks based on the specified task type and language settings.
 * This function sends a POST request to the server to retrieve the necessary configurations for the given task type and language.
 *
 * @async
 * @function
 * @param {string} taskType - The type of translation task (e.g., 'asr', 'translation', 'tts').
 * @param {string} srcLang - The source language for translation.
 * @param {string} [targetLang] - The target language for translation (only used for 'translation' task type).
 * @returns {Promise<Object|string>} A Promise that resolves to the pipeline configuration object or an error message.
 * @throws {Error} If there's an issue with the POST request or response.
 */
const pipelineConfig = async (taskType, srcLang, targetLang) => {
    try {

        let pipelineTasks_body = '';
        if (taskType == 'asr') {
            pipelineTasks_body = getTasktypeconfig(srcLang)[0]
        } else if (taskType == 'translation') {
            pipelineTasks_body = getTasktypeconfig(srcLang, targetLang)[1]
        } else if (taskType == 'tts') {
            pipelineTasks_body = getTasktypeconfig(srcLang)[2]
        }

        const payload = {
            "pipelineTasks": [
                pipelineTasks_body
            ],
            "pipelineRequestConfig": {
                "pipelineId": "64392f96daac500b55c543cd"
            }
        }

        return await axios.post(getModelurl, payload, { headers: headers }).then(res => {
            let pipelinebody = { "taskType": taskType, "config": { ...res.data.pipelineResponseConfig[0].config[0] } }
            return pipelinebody
        })

    } catch (error) {
        if (error.response) {
            // console.log('Status Code:', error.response.status);
            // console.log('Error Data:', error.response.data);
            // console.log('Error Message:', error.response.data.message);
            return error.response.data.message
        } else {

            console.error('Error occurred:', error.message);
            return { message: "Error processing the request " }
        }

    }
};

export default pipelineConfig;
