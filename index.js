import nmt from "./src/nmt.js";
import asr from "./src/asr.js";
import tts from "./src/tts.js";
import nmt_tts from "./src/nmt+tts.js";
import asr_nmt from "./src/asr+nmt.js";
import asr_nmt_tts from "./src/asr+nmt+tts.js";
import auth from "./config/verification.js";



console.log("running main function from bhashini-translation library")
const bhashini = {
    asr,
    nmt,
    tts,
    nmt_tts,
    asr_nmt,
    asr_nmt_tts,
    auth,

}

export default bhashini;

/*
1. Use `npm link` to create a symbolic link for your local npm library.
2. In another project, run `npm link bhashini-translation` to link and use the library.
3. Follow the library's documentation for code integration and development.
 */