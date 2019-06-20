class ResultError extends Error {
  constructor(msg, code) {
    super(msg)
    this.code = code
  }
}

module.exports = ResultError
