import { RTMBase } from './base.mjs';

/**
 * @class
 * @classdesc Wrapper for Raptoreum wallet functions
 */
class RTMWallet extends RTMBase {
  /**
   * @description Sets headers and URL information
   * @param {String} user - Username
   * @param {String} pass - Password
   * @param {String} [host="localhost"] - Raptoreumd hostname
   * @param {number} [port=9998] - Raptoreumd port number
   */
  constructor(user, pass, host = 'localhost', port = 9998) {
    super(user, pass, host, port);
  }

  /**
   * @method
   * @async
   * @description Cancels an unconfirmed transaction
   * @param {String} tx_id - Transaction ID to cancel
   * @returns {Promise<>}
   */
  async cancelTransaction(tx_id) {
    return await this.request('abandontranscation', tx_id);
  }

  /**
   * @method
   * @async
   * @description Cancels an ongoing wallet rescan
   * @returns {Promise<>}
   */
  async cancelRescan() {
    return await this.request('abortrescan');
  }

  /**
   * @method
   * @async
   * @description Create a multi-signature address
   * @param {number} signatures - Minimum number of signatures required
   * @param {String[]} addresses - List of addresses
   * @returns {Promise<String>} Multi-signature address
   */
  async addMultiSigAddress(signatures, addresses) {
    return await this.request('addmultisigaddress', [signatures, addresses]);
  }

  /**
   * @method
   * @async
   * @description Saves a copy of the wallet
   * @param {String} path - Location to create backup
   * @returns {Promise<>}
   */
  async backupWallet(path) {
    return await this.request('backupwallet', path);
  }

  /**
   * @method
   * @async
   * @description Dumps information HD wallet
   * @returns {Promise<Object>} Wallet information and mnemonic
   */
  async dumpHDInfo() {
    return await this.request('dumphdinfo');
  }

  /**
   * @method
   * @async
   * @description Gets the private key of an address
   * @param {String} address - Base58Check encoded address
   * @returns {Promise<String>} Private key of the address 
   */
  async dumpPrivateKey(address) {
    return await this.request('dumpprivkey', address);
  }

  /**
   * @method
   * @async
   * @description Get human-readable form of data
   * @param {String} file - Name of the wallet
   * @returns {Promise<Object>} Wallet information
   */
  async dumpWallet(file) {
    return await this.request('dumpwallet', file);
  }

  /**
   * @method
   * @async
   * @description Encrypts wallet with a passphrase
   * @param {String} passphrase - Passphrase used to lock wallet
   * @returns {Promise<>}
   */
  async encryptWallet(passphrase) {
    return await this.request('encryptwallet', passphrase);
  }

  /**
   * @method
   * @async
   * @description Generates a new address to receive RTM
   * @returns {Promise<String>} Base58Check encoded address
   */
  async generateAddress() {
    return await this.request('getnewaddress', "");
  }

  /**
   * @method
   * @async
   * @description Geneartes a new addres to be used with raw transactions, not for normal usage
   * @returns {Promise<String>} Base58Check encoded address 
   */
  async getRawChangeAddress() {
    return await this.request('getrawchangeaddress');
  }

  /**
   * @method
   * @async
   * @description Get balance of wallet
   * @param {number} [confirmations=1] - Only count balance with at least minimum confirmations
   * @param {boolean} [locked=false] - Count InstantSend locked funds
   * @param {boolean} [watching=false] - Count watch-only addresses
   * @returns {Promise<number>} Total confirmed balance
   */
  async getConfirmedBalance(confirmations = 1, locked = false, watching = false) {
    return await this.request('getbalance', '*', confirmations, locked, watching);
  }

  /**
   * @method
   * @async
   * @description Gets all unconfirmed balance
   * @returns {Promise<number>} Total unconfirmed balance 
   */
  async getUnconfirmedBalance() {
    return await this.request('getunconfirmedbalance');
  }

  /**
   * @method
   * @async
   * @description Get balance of a single address
   * @param {String} address - Base58Check encoded address
   * @param {*} [confirmations=1] - Only count balance with at least minimum confirmations
   * @param {*} [locked=false] - Count InstantSend locked funds
   * @returns {Promise<Number>} Address balance
   */
  async getReceivedByAddress(address, confirmations = 1, locked = false) {
    return await this.request('getreceivedbyaddress', address, confirmations, locked);
  }

  /**
   * @method
   * @async
   * @description Get a transaction by its id
   * @param {String} tx_id Transaction ID used to retrieve
   * @param {boolean} [watching=false] - Count watch-only addresses
   * @returns {Promise<Object>} Transaction details
   */
     async getTransactions(tx_id, watching = false) {
      return await this.request('gettransaction', tx_id, watching);
    }

  /**
   * @method
   * @async
   * @description Retrieves wallet data
   * @returns {Promise<Object>} Wallet information
   */
  async getWalletInfo() {
    return await this.request('getwalletinfo');
  }

  /**
   * @todo Implement these functions
   */
  // async importAddress()
  // async importElectrumWallet()
  // async importMulti()
  // async importPrivateKey()
  // async importPrunedFunds()
  // async importWallet()
  // async keepass()
  // async keypoolrefill

  /**
   * @method
   * @async
   * @description Gets a list of all addresses and balance in a wallet
   * @param {number} minimum - Minimum balance filter in RTM
   * @returns {Promise<Object>} Object containing the addresses and balance
   */
  async listAddressBalances(minimum = 0) {
    return await this.request('listaddressbalances', minimum);
  }

  /**
   * @method
   * @async
   * @description Gets a list of groups of addresses
   * @returns {Promise<Object[][]>} List of groups of addresses
   */
  async listAddressGroupings() {
    return await this.request('listaddressgroupings');
  }

  /**
   * @method
   * @async
   * @description Shows locked unspent transactions
   * @returns {Promise<Object[]>} List of locked unspent transactions
   */
  async listLockUnspent() {
    return await this.request('listlockunspent');
  }

  /**
   * @method
   * @async
   * @description Shows how much each address in the wallet has received
   * @param {number} confirmations - Only count balance with at least minimum confirmations
   * @param {boolean} [locked=false] - Count InstantSend locked funds
   * @param {boolean} [empty=true] - Count empty addresses
   * @param {boolean} [watching=false] - Count watch-only addresses
   * @returns {Promise<Object[]>} List of objects containing transactions
   */
  async listReceivedByAddress(confirmations, locked = false, empty = true, watching = false) {
    return await this.request('listreceivedbyaddress', confirmations, locked, empty, watching);
  }

  /**
   * @method
   * @async
   * @description Gets a list of transactions since a block
   * @param {*} [hash=""] - Hash of starting block
   * @param {*} [target_confirmations=1] - Nth block hash from the main chain
   * @param {boolean} [watching=false] - Count watch-only addresses
   * @param {boolean} [removed=false] - Count transactions removed by a reorg
   * @returns {Promise<Object>} Object of transactions, removed, and last block
   */
  async listSinceBlock(hash = "", target_confirmations = 1, watching = false, removed = false) {
    return await this.request('listsinceblock', hash, target_confirmations, watching, removed);
  }

  /**
   * @method
   * @async
   * @description Get a list of the most recent transactions
   * @param {*} count - N most recent transactions
   * @param {*} skip - Offset from the end
   * @param {*} watching - Count watch-only addresses
   * @returns {Promise<Object[]>} List of transactions
   */
  async listTransactions(count, skip = 0, watching = false) {
    return await this.request('listtransactions', count, skip, watching);
  }

  /**
   * @method
   * @async
   * @description Retrieve all wallets on the server
   * @returns {Promise<String[]>} List of wallets 
   */
  async listWallets() {
    return await this.request('listwallets');
  }

  /**
   * @method
   * @async
   * @description Locks unspent transactions
   * @param {String} tx - List of transactions IDs and vout
   * @returns {Promise<boolean>} Completion status
   */
  async lockUnspent(tx) {
    return await this.request('lockunspent', false, tx);
  }

  /**
   * @method
   * @async
   * @description Unlocks unspent transactions
   * @param {String} tx - List of transactions IDs and vout
   * @returns {Promise<boolean>} Completion status
   */
  async unlockUnspent(tx) {
    return await this.request('lockunspent', true, tx);
  }

  /**
   * @method
   * @async
   * @description Removes transactions from balance
   * @param {String} tx_id - Transaction ID to prune
   * @returns Completetion status
   */
  async removePrunedFunds(tx_id) {
    return await this.request('removeprunedfunds', tx_id);
  }

  /**
   * @method
   * @async
   * @description Sends to multiple addresses
   * @param {Object} amounts - JSON object { ADDRESS:AMOUNT... }
   * @param {number} [confirmations=1] - Only count balance with at least minimum confirmations
   * @param {boolean} [locked=false] - Count InstantSend locked funds
   * @param {String} [comment] - Comment to be included with transaction
   * @param {Array} [subtract_fee_from] - Target addresses to subtract fee from, split evenly
   * @param {boolean} [private_send=false] - Used only PrivateSend funds
   * @param {number} [confirm_target=0] - Desired block confirmation time (Used to estimate fee)
   * @param {String} [fee_estimate="UNSET"] - "UNSET"|"ECONOMICAL"|"CONSERVATIVE"
   * @returns {Promise<String>} Transaction ID
   */
  async sendMany(amounts, confirmations = 1, locked = false, comment = "", subtract_fee_from = [], private_send = false, confirm_target = 0, fee_estimate = "UNSET") {
    return await this.request('sendmany', "", amounts, confirmations, locked, comment, subtract_fee_from, private_send, confirm_target, fee_estimate);
  }

  /**
   * @method
   * @async
   * @description Sends to multiple addresses
   * @param {String} address - Base58Check encoded recipient address
   * @param {number} amount - RTM to send
   * @param {String} [note=""] - Note to self
   * @param {String} [comment=""] - Comment to be included with transaction
   * @param {boolean} [fee_included=false] - Subtract fee from transaction amount
   * @param {boolean} [private_send=false] - Used only PrivateSend funds
   * @param {number} [confirm_target=0] - Desired block confirmation time (Used to estimate fee)
   * @param {String} [fee_estimate="UNSET"] - Fee estimation criteria ("UNSET"|"ECONOMICAL"|"CONSERVATIVE")
   * @returns {Promise<String>} Transaction ID
   */
  async sendToAddress(address, amount, note = "", comment = "", fee_included = false, private_send = false, confirm_target = 1, fee_estimate = "UNSET") {
    return await this.request('sendtoaddress', address, amount, note, comment, fee_included, false, private_send, confirm_target, fee_estimate);
  }

  /**
   * @method
   * @async
   * @description Add RTM to PrivateSend funds
   * @param {number} amount - RTM to add to PrivateSend funds
   * @returns {Promise<>}
   */
  async setPrivateSendAmount(amount) {
    return await this.request('setprivatesendamount', amount);
  }

  /**
   * @method
   * @async
   * @description Set the number of mixing rounds for PrivateSend
   * @param {number} rounds - Number of rounds to mix
   * @returns {Promise<>}
   */
  async setPrivateSendRound(rounds) {
    return await this.request('setprivatesendrounds', rounds);
  }

  /**
   * @method
   * @async
   * @description Set transaction fees for all outgoing transactions
   * @param {*} amount - Amount in RTM/kB
   * @returns {Promise<boolean>} Completion status
   */
  async setTxFee(amount) {
    return await this.request('settxfee', amount);
  }

  /**
   * @method
   * @async
   * @description Signs a message with private key
   * @param {String} address - Base58Check encoded address
   * @param {*} message - Message to sign
   * @returns {Promise<String>} Base64 encoded signed message
   */
  async signMessage(address, message) {
    return await this.request('signmessage', address, message);
  }

  /**
   * @method
   * @async
   * @description Locks an unlocked wallet
   * @returns {Promise<String>} Base64 encoded signature
   */
  async lockWallet() {
    return await this.request('walletlock');
  }

  /**
   * @method
   * @async
   * @description Unlocks a locked wallet
   * @param {String} passphrase - Passphrase used to lock wallet
   * @param {number} seconds - Unlock duration in seconds
   * @param {boolean} mixing_only - Disables sending features
   * @returns {Promise<>}
   */
  async unlockWallet(passphrase, seconds = 60, mixing_only = false) {
    return await this.request('walletpassphrase', passphrase, seconds, mixing_only);
  }

  /**
   * @method
   * @async
   * @description Changes wallet passphrase
   * @param {String} old_passphrase - Old passphrase
   * @param {String} new_passphrase - New passphrase
   * @returns {Promise<>}
   */
  async changeWalletPassphrase(old_passphrase, new_passphrase) {
    return await this.request('walletpassphrasechange', old_passphrase, new_passphrase);
  }
}

export { RTMWallet };