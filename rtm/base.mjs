/**
 * @class
 * @classdesc Handles Raptoreum server requests and credentials
 */
class RTMBase {
  /**
   * @private
   */
  #url = null;
  #headers = null;

  /**
   * @description Sets headers and URL information
   * @param {String} user - Username
   * @param {String} pass - Password
   * @param {String} [host="localhost"] - Raptoreumd hostname
   * @param {number} [port=9998] - Raptoreumd port number
   */
  constructor(user, pass, host = 'localhost', port = 9998) {
    let base64auth = Buffer.from(`${user}:${pass}`).toString('base64');

    this.#url = `http://${host}:${port}`;
    this.#headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Basic ${base64auth}`
    };
  }

  /**
   * @method
   * @async
   * @description Makes request to Raptoreum server
   * @param {String} method - Raptoreum CLI method name
   * @param  {...any} params - List of arguments
   * @throws {*} Throws Raptoreum CLI errors
   * @returns {Object}
   */
  async request(method, ...params) {
    let body = {
      'jsonrpc': '1.0',
      'id': 'RTMClient',
      'method': method,
      'params': params
    };
    let res = await fetch(this.#url, {
      'method': 'POST',
      'headers': this.#headers,
      'body': JSON.stringify(body)
    });
    let { result, error } = await res.json();

    if(error) {
      throw error.message;
    }

    return result;
  }
}

export { RTMBase };