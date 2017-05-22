const bcrypt = require("bcrypt-nodejs")

let crypto
try {
	crypto = require('crypto')
} catch (err) {
	console.log('crypto support is disabled!')
}
module.exports = f = {

	lower: function(string) {
		return String(string).toLowerCase()
	},

	upper: function(string) {
		return String(string).toUpperCase()
	},

	generate: function(length) {
		let allowedString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		generated = ""
		for(let i=0;i<parseInt(length);i++) {
			let random = Math.floor(Math.random() * allowedString.length)
			generated += allowedString[random]
		}

		return String(generated)
	},

	random: function(start, end) {
		return Math.floor(parseInt(start) + Math.random() * (parseInt(end)-parseInt(start)))
	},

	crypt: {
		make: function(password) {
			return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
		},
		verify: function(password, crypted) {
			return bcrypt.compareSync(password, crypted)
		}
	},
	
	gettime: function() {
		let date = new Date()
		return date.getTime()
	},

	stringify: function(data) {
		if(typeof data === "object") {
			return JSON.stringify(data)
		}
	},

	parse: function(data) {
		if(typeof data === "string") {
			try {
				let parsed = JSON.parse(data)
				return parsed
			} catch(Exception) {
				return {error: Exception.message}
			}
		}
	},

	isEmail: function(string) {
		let regex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
		return regex.test(string)
	},

	isNumber: function(number) {
		if(typeof number === "number") {
			return true
		}
		return false
	},

	isChar: function(string) {
		let regex = /^[A-Za-z0-9_]+$/
		return regex.test(string)
	},

	trim: function(string) {
		return String(string).trim()
	},

	getsize: function(bytes) {
		let bytesNumber = parseInt(bytes)
		let size
		let symbol
		if (bytesNumber >=1099511627776) {
			size = (bytesNumber / 1099511627776).toFixed(2)
			symbol = " TB"
		} else if (bytesNumber >= 1073741824) {
			size = (bytesNumber / 1073741824).toFixed(2)
			symbol = " GB"
		} else if (bytesNumber >= 1048576) {
			size = (bytesNumber / 1048576).toFixed(2)
			symbol = " MB"
		} else if (bytesNumber >= 1024) {
			size = (bytesNumber / 1024).toFixed(2)
			symbol = " KB"
		} else {
			size = bytes
			symbol = " B"
		}
		if(parseInt(size) !== parseFloat(size)) {
			return String(size) + symbol
		} else {
			return String(parseInt(size)) + symbol
		}

	},


	clearSpace: function(string) {
		let array = String(string).split(" ")
		return array.join("")
	},

	sha256: function(string) {
		let hash = crypto.createHash("sha256")
		hash.update(string)
		return hash.digest('hex')
	},

	md5: function(string) {
		let hash = crypto.createHash("md5")
		hash.update(string)
		return hash.digest('hex')
	},
	sha1: function(string) {
		let hash = crypto.createHash("sha1")
		hash.update(string)
		return hash.digest('hex')
	},

	base64encode: function(string) {
		return new Buffer(string).toString('base64')
	},

	base64decode: function(encoded) {
		return new Buffer(encoded, 'base64').toString('utf8')
	},
	base: function(num) {
		return {
			from: function(baseFrom) {
					return {
						to: function(baseTo) {
							return parseInt(num, baseFrom).toString(baseTo)
						}
					}
			}
		}
	},
	bin2hex: function(bin) {
		return parseInt(String(bin), 2).toString(16)
	},
	bin2dec: function(bin) {
		return parseInt(String(bin), 2).toString(10)
	},
	bin2oct: function(bin) {
		
		return parseInt(hin, 2).toString(8)
	},
	oct2bin: function(oct) {
		return parseInt(oct, 8).toString(2)
	},
	oct2dec: function(oct) {
		return parseInt(oct, 8).toString(10)
	},
	oct2hex: function(oct) {
		return parseInt(oct, 8).toString(16)
	},
	dec2bin: function(dec) {
		return parseInt(dec, 10).toString(2)
	},
	dec2oct: function(dec) {
		return parseInt(dec, 10).toString(8)
	},
	dec2hex: function(dec) {
		return parseInt(dec, 10).toString(16)
	},
	hex2bin: function(hex) {
		return parseInt(hex, 16).toString(2)
	},
	hex2oct: function(hex) {
		return parseInt(hex, 16).toString(8)
	},
	hex2dec: function(hex) {
		return parseInt(hex, 16).toString(10)
	}
}
