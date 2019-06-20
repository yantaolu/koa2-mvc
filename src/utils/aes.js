const crypto = require('crypto')

const defaultKey = 'j2lv0bev5cdidfrs'

const defaultIv = '3uiuiyuyendjhdtw'

/**
 * 加密方法
 *
 * @param data 明文
 * @param key 密钥key
 * @param iv 向量
 * @returns {string} 密文
 */
const encrypt = function(data, key = defaultKey, iv = defaultIv) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  let crypted = cipher.update(data, 'utf8', 'binary')
  crypted += cipher.final('binary')
  return Buffer.from(crypted, 'binary').toString('base64')
}

/**
 * 解密方法
 * @param key 密钥key
 * @param iv 向量
 * @param crypted 密文
 * @returns {string} 明文
 */
const decrypt = function(crypted, key = defaultKey, iv = defaultIv) {
  crypted = Buffer.from(crypted, 'base64').toString('binary')
  var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  var decoded = decipher.update(crypted, 'binary', 'utf8')
  decoded += decipher.final('utf8')
  return decoded
}

module.exports = {
  encrypt,
  decrypt
}
