/**
 * Converts a base64-encoded audio file to an audio URI.
 *
 * @function
 * @param {string} base64Sound - The base64-encoded audio data.
 * @returns {string} The audio URI representing the converted audio data.
 */
function getaudioUri(base64Sound) {
    const audioData = atob(base64Sound);
    const arrayBuffer = new Uint8Array(audioData.length);

    for (let i = 0; i < audioData.length; i++) {
        arrayBuffer[i] = audioData.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
    const audioUri = URL.createObjectURL(blob);

    return audioUri;
}

export default getaudioUri;