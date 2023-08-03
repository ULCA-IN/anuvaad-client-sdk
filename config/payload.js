import pipelineConfig from "./pipelineConfig.js";

// INPUT DATA 
const input_text = (sourceText) => {
    return {
        "input": [
            {
                "source": sourceText
            }
        ]
    }
}

const input_base64 = (base64) => {
    return {

        "audio": [
            {
                "audioContent": base64
            }
        ]

    }
}


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


// asr
export const asr_payload = async (sourceLang, base64) => {
    const asrPipeline = await pipelineConfig('asr', sourceLang);
    return {
        "pipelineTasks": [asrPipeline],
        "inputData": input_base64(base64)
    }
}

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

// nmt
export const nmt_payload = async (sourceLang, targetLang, sourceText) => {
    const translationPipeline = await pipelineConfig('translation', sourceLang, targetLang);
    return {
        "pipelineTasks": [translationPipeline],
        "inputData": input_text(sourceText)
    }
}

// nmt + tts
export const nmt_tts_payload = async (sourceLang, targetLang, sourceText, gender) => {
    const translationPipeline = await pipelineConfig('translation', sourceLang, targetLang);
    const ttsPipeline = await getTtsPipeline(sourceLang, gender);

    return {
        "pipelineTasks": [translationPipeline, ttsPipeline],
        "inputData": input_text(sourceText)
    }
}

// tts
export const tts_payload = async (sourceLang, sourceText, gender) => {
    const ttsPipeline = await getTtsPipeline(sourceLang, gender);

    return {
        "pipelineTasks": [ttsPipeline],
        "inputData": input_text(sourceText)
    }

}

