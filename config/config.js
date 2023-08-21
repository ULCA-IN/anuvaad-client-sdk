/**
 * Module containing URLs.
 * @module config
 */
/**
 * URL for retrieving models from ULCA's model pipeline based on Pipeline ID.
 *
 * @type {string}
 * @readonly
 */
const getModelurl = 'https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline';
/**
 * Base URL for the inference pipeline service provided by Bhashini, utilized for POST requests.
 *
 * @type {string}
 * @readonly
 */
const serviceUrl = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';

export { getModelurl, serviceUrl }

/**
 * Link to the Bhashini API documentation used in this npm library.
 *
 * @external {Bhashini_API}
 * @see [Bhashini API GitBook Documentation]{@link https://bhashini.gitbook.io/}
 */
