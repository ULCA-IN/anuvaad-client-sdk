import axios from "axios";
import { getModelurl } from "./config.js";
import { headers } from "./verification.js";
import getTasktypeconfig from "./tasktypeConfig.js"


const serviceId = async (taskType, srcLang, targetLang) => {
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
            // console.log("service id output", res.data.pipelineResponseConfig[0].config[0].serviceId)
            // console.log("service id output", res.data.pipelineResponseConfig[0])

            return res.data.pipelineResponseConfig[0].config[0].serviceId
        })

    } catch (error) {
        if (error.response) {
            console.log('Status Code:', error.response.status);
            console.log('Error Data:', error.response.data);
            // console.log('Error Message:', error.response.data.message);
            return error.response.data.message
        } else {

            console.error('Error occurred:', error.message);
            return { message: "Error processing the request " }
        }

    }
};

// serviceId('translation', 'en', 'hi')

export default serviceId;
