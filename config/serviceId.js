import axios from "axios";

//for getting the service id dynamically
//working 
const serviceId = async (taskType, srcLang, targetLang) => {
    try {
        const url = 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline'
        const headers = {
            'userId': '9083a5240ddc473ba1e706b7df47c7a0',
            'ulcaApiKey': '25e21b8af7-4d7a-4d29-89d4-6d7a3e745e12'
        };
        const tasktype_config = [{
            "taskType": "asr",
            "config": {
                "language": {
                    "sourceLanguage": srcLang
                }
            }
        },
        {
            "taskType": 'translation',
            "config": {
                "language": {
                    "sourceLanguage": srcLang,
                    "targetLanguage": targetLang
                }
            }
        },
        {
            "taskType": "tts",
            "config": {
                "language": {
                    "sourceLanguage": srcLang
                }
            }
        }
        ]
        let pipelineTasks_body = '';
        if (taskType == 'asr') {
            pipelineTasks_body = tasktype_config[0]
        } else if (taskType == 'translation') {
            pipelineTasks_body = tasktype_config[1]
        } else if (taskType == 'tts') {
            pipelineTasks_body = tasktype_config[2]
        }

        const payload = {
            "pipelineTasks": [
                pipelineTasks_body
            ],
            "pipelineRequestConfig": {
                "pipelineId": "64392f96daac500b55c543cd"
            }
        }
        return await axios.post(url, payload, { headers }).then(res => {
            // console.log("service id output", res.data.pipelineResponseConfig[0].config[0].serviceId)
            return res.data.pipelineResponseConfig[0].config[0].serviceId
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



export default serviceId;
