# Bhashini-Translation
AI-powered language translation services for Indian languages. Easy integration and extensive language support. It's integrating with [Bhashini Api](https://bhashini.gitbook.io/bhashini-apis/). It seamlessly integrates with web frontends such as Vanilla JS, React, and Angular.  
Bhashini follows [ISO-639 series](https://www.loc.gov/standards/iso639-2/php/code_list.php) of language codes.

## Features:
- [ASR: Automatic Speech Recognition](#asr-automatic-speech-recognition)
- [NMT: Neural Machine Translation](#nmt-neural-machine-translation)
- [TTS: Text to Speech](#tts-text-to-speech)
- [ASR + NMT: Speech to Text Translation](#asr-nmt-speech-to-text-translation)
- [NMT + TTS: Text Translation to Speech](#nmt-tts-text-translation-to-speech)
- [ASR + NMT + TTS: Speech to Speech Translation](#asr-nmt-tts-speech-to-speech-translation)


# Getting Started
1. Install the package using npm or yarn
```shell
npm install bhashini-translation  
```
<center> or </center>  
  
```shell
yarn add bhashini-translation  
```

2. Import the package
```shell
import bhashini from 'bhashini-translation'
```
3. set your userid, UlcaApiKey, InferenceApiKey to initialize library, to get [see](#get-authentication-details)
 - Step 1: Go to entry point of your project
 - Step 2: call 
 ```shell
 bhashini.auth("userid", "UlcaApiKey", "InferenceApiKey")
 ```
4. Now you are ready to use the features [I will add example here later]

## <a id="get-authentication-details"></a> get authentication details
Signup [here](https://bhashini.gov.in/ulca/user/register) to get authentication details  
    - Step 1: Fill out the registration form.
   - Step 2: Perform email authentication to enable login functionality
   - Step 3: Login using the authenticated email.
   - Step 4: Open the "My Profile" section
   - Step 5: create the API Key using Generate Button under My Profile section. 
    [App name should use lowercase words and underscores.]  
   - Step 6: press generate in api key to get credentials
   - Step 7: now copy `userid`, `UlcaApiKey`, and 	`Inference API Key Value` for `Meity` and pass as argument in `bhashini.auth("userid", "UlcaApiKey", "InferenceApiKey")` function  
 
# Code Structure

```plaintext
bhashini-translation-library/
├── package.json
├── jsdoc.json
├── index.js
├── README.md
├── configs/
│   ├── config.js
│   ├── payload.js
│   ├── pipelineConfig.js
│   ├── tasktypeConfig.js
│   └── verification.js
├── src/
│   ├── Utils
│   │    ├── audioUri.js
│   │    └── baseApi.js
│   ├── asr.js
│   ├── nmt.js
│   ├── tts.js
│   ├── asr_nmt.js
│   ├── nmt_tts.js
│   └── asr_nmt_tts.js
└── .gitignore
```
## Root Directory:

- **`package.json`**: Contains metadata and configuration for npm library, containing  "name": "bhashini-translation" 
- **`jsdoc.json`**: This project uses JSDoc to generate documentation for the codebase. This file specifies various settings that control how the documentation is generated.
- **`index.js`**: The main entry point for your library, where all functionalities are exported.

## Configuration Folder:

- **`configs/`**: This directory contains configuration-related files.
- **`config.js`**: Contains urls for the library.
  - **`payload.js`**: Handles payload related configurations.
  - **`pipelineConfig.js`**: Handles configurations related to the pipeline.
  - **`tasktypeConfig.js`**: Contains configurations for different task types.
  - **`verification.js`**: Handles verification and authentication configurations.
## Source Code Directory:

- **`src/`**: This directory contains the source code of the library.
  - **`Utils/`**: Utility functions are placed inside this directory.
    - **`audioUri.js`**: A utility function that handles audio URIs.
    - **`baseApi.js`**: A base class that provides a common structure for API requests.

  - **`asr.js`**: Contains the code for Automatic Speech Recognition (ASR) functionality.
  - **`nmt.js`**: Contains the code for Neural Machine Translation (NMT) functionality.
  - **`tts.js`**: Contains the code for Text-to-Speech (TTS) functionality.
  - **`asr_nmt.js`**: Contains the code for a combined functionality of ASR and NMT.
  - **`nmt_tts.js`**: Contains the code for a combined functionality of NMT and TTS.
  - **`asr_nmt_tts.js`**: Contains the code for a combined functionality of ASR, NMT, and TTS.

## Version Control:

- **`.gitignore`**: A file specifying which files and directories to exclude from version control.

### Notice

All functions in Bhashini return promises, so it is important to handle the promise-based output for proper asynchronous handling and retrieval of results.  

# How to use functionality:  
## <a id="asr-automatic-speech-recognition"></a> ASR: Automatic Speech Recognition
**converts spoken language into written text**  
The ASR interface provides methods to convert spoken language into text and is ideal for applications that require voice-to-text conversion.  
**input**: source language, Base64-encoded audio in .wav format 
**output**: Text
```js
bhashini.asr('sourceLang',"Base64")
```

## <a id="nmt-neural-machine-translation"></a> NMT: Neural Machine Translation
**translate text from one language to another indic language**   
The NMT interface provides methods to translate text from one language to another using advanced neural network models for high-quality translations.  
**input**: source language, target language, Text  
**output**: Translated text from source language to target language
```js
bhashini.nmt('sourceLang',"targetLang", "Text")
```
## <a id="tts-text-to-speech"></a> TTS: Text to Speech
**converts written text into spoken words**   
The TTS interface allows users to convert text into natural-sounding speech with the option to choose different voices, making it useful for applications that require generating speech output.  
- If gender is not passed, the default option will be used.     

**input**: source language, Text, gender (male or female)  
**output**: Audio URI
```js
bhashini.tts('sourceLang',"Text", "gender")
```
## <a id="asr-nmt-speech-to-text-translation"></a> ASR + NMT: Speech to Text Translation
 **speech-to-text transcription in the target language**   
 This interface offers a seamless integration of speech recognition and translation, allowing users to transcribe spoken language and directly translate it.   
**input**: source language,target language, Base64-encoded audio in .wav format      
**output**: Translated text
```js
bhashini.asr_nmt('sourceLang', "targetLang", "Base64")
```
## <a id="nmt-tts-text-translation-to-speech"></a> NMT + TTS: Text Translation to Speech
**Translates written text to another language and generates audio content in base64**  
This interface enables users to translate text and then convert it to speech with the option to choose different voices,, making it suitable for applications that require translated speech output. 
- If gender is not passed, the default option will be used.    
      
**input**: source language,targetLang, Text, gender (male or female)  
**output**: Audio URI of translated text
```js
bhashini.nmt_tts('sourceLang', "targetLang", "Text", "gender")
```
## <a id="asr-nmt-tts-speech-to-speech-translation"></a> ASR + NMT + TTS: Speech to Speech Translation
**Converts spoken language to another Indic spoken language**    
This comprehensive interface provides the ability to perform speech recognition, translation, and text-to-speech conversion in one call supporting voice selection, catering to complex language processing needs.   
- If gender is not passed, the default option will be used.    
  
**input**: source language, target language, Base64-encoded audio in .wav format, gender (male or female)   
**output**: Audio Uri
```js
bhashini.asr_nmt_tts('sourceLang', "targetLang", "Base64", "gender")
```
