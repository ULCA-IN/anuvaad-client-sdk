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