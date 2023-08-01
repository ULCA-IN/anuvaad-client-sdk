import axios from "axios";
import { serviceUrl } from "../../config/config.js";
import { headers } from "../../config/verification.js";
import getaudioUri from "./audioUri.js";

class BaseApi {
    async post(data) {
        try {
            return await axios.post(serviceUrl, data, { headers }).then(function (res) {
                // console.log('data : ', data.pipelineTasks)
                /***** translation *****/
                if (data.pipelineTasks[0].taskType === 'translation') {
                    if (data.pipelineTasks[1] != null && data.pipelineTasks[1].taskType === 'tts') {
                        const response = [
                            res.data.pipelineResponse[0].output[0].source,  // sourceText  [0]
                            res.data.pipelineResponse[1].output[0].target, // translated text  [1]
                            res.data.pipelineResponse[2].audio[0].audioContent // translated audio  [2]
                        ]
                        const base64Sound = response[2]
                        return getaudioUri(base64Sound)
                    }
                    console.log('Response:', res.data.pipelineResponse[0].output[0].target);
                    return res.data.pipelineResponse[0].output[0].target
                }
                /***** asr , asr+nmt+tts, asr+nmt *****/
                else if (data.pipelineTasks[0].taskType === 'asr') {

                    // asr+nmt+tts
                    if (data.pipelineTasks[1] != null && data.pipelineTasks[2] != null && data.pipelineTasks[2].taskType === 'tts') {
                        const response = [
                            res.data.pipelineResponse[0].output[0].source,  // sourceText  [0]
                            res.data.pipelineResponse[1].output[0].target, // translated text  [1]
                            res.data.pipelineResponse[2].audio[0].audioContent // translated audio  [2]
                        ]
                        const base64Sound = response[2]
                        return getaudioUri(base64Sound)
                    }

                    // asr+nmt
                    if (data.pipelineTasks[1] != null && data.pipelineTasks[1].taskType === 'translation') {
                        const response = [
                            res.data.pipelineResponse[0].output[0].source,
                            res.data.pipelineResponse[1].output[0].target
                        ]
                        console.log('asr+nmt')

                        return response[1]
                    }

                    //asr
                    console.log('Response:', res.data.pipelineResponse[0].output[0].source);
                    return res.data.pipelineResponse[0].output[0].source
                }
                /***** tts *****/
                else if (data.pipelineTasks[0].taskType === 'tts') {
                    console.log('running tts')
                    let base64Sound = res.data.pipelineResponse[0].audio[0].audioContent;
                    return getaudioUri(base64Sound)
                    // return res.data.pipelineResponse[0].audio[0].audioContent  // returns base64
                }

            }).catch(function (error) {
                console.log("errors: ", error)
                // console.error('Errors ', error.response.data);
                return error.response
            });
        } catch (error) {
            console.error('Error occurred during POST request:', error);
            throw error;
        }
    }
}

export default BaseApi;