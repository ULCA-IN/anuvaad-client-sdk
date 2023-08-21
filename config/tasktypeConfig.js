/**
 * Get configuration objects for different translation task types.
 * These configurations are used within the pipelineConfig module to set up translation tasks.
 *
 * @function
 * @param {string} srcLang - The source language for translation.
 * @param {string} [targetLang] - The target language for translation (only used for 'translation' task type).
 * @returns {Object[]} An array of configuration objects for translation task type (asr, translation, tts).
 */
const getTasktypeconfig = (srcLang, targetLang) => {
    return [
        {
            "taskType": "asr",
            "config": {
                "language": {
                    "sourceLanguage": srcLang
                }
            }
        },
        {
            "taskType": "translation",
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
}
export default getTasktypeconfig