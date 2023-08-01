
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