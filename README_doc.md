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
3. set your api key to initialize library, to get [see](#get-authentication-details)
 - Step 1: Go to entry point of your project
 - Step 2: call 
 ```shell
 bhashini.auth("your_api_key")
 ```
4. Now you are ready to use the features [I will add example here later]

## get authentication details
Signup [here](https://bhashini.gov.in/ulca/user/register) to get authentication details  
    - Step 1: Fill out the registration form.
   - Step 2: Perform email authentication to enable login functionality
   - Step 3: Login using the authenticated email.
   - Step 4: Open the "My Profile" section
   - Step 5: create the API Key using Generate Button under My Profile section. 
    [App name should use lowercase words and underscores.]  
   - Step 6: press generate in api key to get authorization token
   - Step 7: now copy 	`Inference API Key Value` for `Meity` and pass as argument in `bhashini.auth("your_api_key")` function  
 
# Code Structure

```plaintext
bhashini-translation-library/
├── package.json
├── index.js
├── configs/
│   ├── serviceId.js
│   └── verification.js
├── src/
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
- **`index.js`**: The main entry point for your library, where all functionalities are exported.
- **`config.js`**: The environment file storing credentials and other sensitive data for bhashini api. 

## Configuration Folder:

- **`configs/`**: This directory contains configuration-related files.
  - **`serviceId.js`**: A file containing service IDs needed to interact with services provided by the Bhashini API. This file is used to fetch service IDs dynamically during runtime to talk to the Bhashini API.

## Source Code Directory:

- **`src/`**: This directory contains the source code of the library.
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
## ASR: Automatic Speech Recognition
**converts spoken language into written text**  
The ASR interface provides methods to convert spoken language into text and is ideal for applications that require voice-to-text conversion.  
**input**: source language, audioContent in base64 format  
**output**: Text
```js
bhashini.asr('sourceLang',"Base64")
```

## NMT: Neural Machine Translation
**translate text from one language to another indic language**   
The NMT interface provides methods to translate text from one language to another using advanced neural network models for high-quality translations.  
**input**: source language, target language, Text  
**output**: Translated text from source language to target language
```js
bhashini.nmt('sourceLang',"targetLang", "Text")
```
## TTS: Text to Speech
**converts written text into spoken words**   
The TTS interface allows users to convert text into natural-sounding speech, making it useful for applications that require generating speech output.  
**input**: source language, Text  
**output**: Audio content in Base64
```js
bhashini.tts('sourceLang',"Text")
```
## ASR + NMT: Speech to Text Translation
 **speech-to-text transcription in the target language**   
 This interface offers a seamless integration of speech recognition and translation, allowing users to transcribe spoken language and directly translate it.   
**input**: source language,target language, audioContent in base64 format      
**output**: Translated text
```js
bhashini.asr_nmt('sourceLang', "targetLang", "Base64")
```
## NMT + TTS: Text Translation to Speech
**Translates written text to another language and generates audio content in base64**  
This interface enables users to translate text and then convert it to speech, making it suitable for applications that require translated speech output.  
**input**: source language,targetLang, Text  
**output**: translated text
```js
bhashini.nmt_tts('sourceLang', "targetLang", "Text")
```
## ASR + NMT + TTS: Speech to Speech Translation
**Converts spoken language to another Indic spoken language**    
This comprehensive interface provides the ability to perform speech recognition, translation, and text-to-speech conversion in one call, catering to complex language processing needs.   
**input**: source language, target language, audioContent in base64 format   
**output**: audio content in base64
```js
bhashini.asr_nmt_tts('sourceLang', "targetLang", "Base64")
```
