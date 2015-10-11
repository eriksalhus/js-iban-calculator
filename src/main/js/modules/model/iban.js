/**
 * Javascript IBAN Calculator
 * Copyright (C) 2013 Erik Salhus (erik.salhus@gmail.com)
 *
 * Based on iban.js 1.5 developed by Thomas Gunther tom@toms-cafe.de
 * Copyright (C) 2002-2010, Thomas Günther (tom@toms-cafe.de)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */
define([], function () {

    var formats = [
        { "country": "Andorra", 				"code": "AD", "bank_code_format": "0  4n 4n", "account_format": "0  12   0 " },
        { "country": "Albania", 				"code": "AL", "bank_code_format": "0  8n 0 ", "account_format": "0  16   0 " },
        { "country": "Austria", 				"code": "AT", "bank_code_format": "0  5n 0 ", "account_format": "0  11n  0 " },
        { "country": "Bosnia and Herzegovina",  "code": "BA", "bank_code_format": "0  3n 3n", "account_format": "0   8n  2n" },
        { "country": "Belgium", 				"code": "BE", "bank_code_format": "0  3n 0 ", "account_format": "0   7n  2n" },
        { "country": "Bulgaria",  				"code": "BG", "bank_code_format": "0  4a 4n", "account_format": "2n  8   0 " },
        { "country": "Switzerland", 			"code": "CH", "bank_code_format": "0  5n 0 ", "account_format": "0  12   0 " },
        { "country": "Cyprus", 					"code": "CY", "bank_code_format": "0  3n 5n", "account_format": "0  16   0 " },
        { "country": "Czech Republic",  		"code": "CZ", "bank_code_format": "0  4n 0 ", "account_format": "0  16n  0 " },
        { "country": "Germany", 				"code": "DE", "bank_code_format": "0  8n 0 ", "account_format": "0  10n  0 " },
        { "country": "Denmark", 				"code": "DK", "bank_code_format": "0  4n 0 ", "account_format": "0   9n  1n" },
        { "country": "Estonia",  				"code": "EE", "bank_code_format": "0  2n 0 ", "account_format": "2n 11n  1n" },
        { "country": "Spain",  					"code": "ES", "bank_code_format": "0  4n 4n", "account_format": "2n 10n  0 " },
        { "country": "Finland", 				"code": "FI", "bank_code_format": "0  6n 0 ", "account_format": "0   7n  1n" },
        { "country": "Faroe Islands",  			"code": "FO", "bank_code_format": "0  4n 0 ", "account_format": "0   9n  1n" },
        { "country": "France", 					"code": "FR", "bank_code_format": "0  5n 5n", "account_format": "0  11   2n" },
        { "country": "United Kingdom",  		"code": "GB", "bank_code_format": "0  4a 6n", "account_format": "0   8n  0 " },
        { "country": "Georgia", 				"code": "GE", "bank_code_format": "0  2a 0 ", "account_format": "0  16n  0 " },
        { "country": "Gibraltar", 				"code": "GI", "bank_code_format": "0  4a 0 ", "account_format": "0  15   0 " },
        { "country": "Greenland", 				"code": "GL", "bank_code_format": "0  4n 0 ", "account_format": "0   9n  1n" },
        { "country": "Greece", 					"code": "GR", "bank_code_format": "0  3n 4n", "account_format": "0  16   0 " },
        { "country": "Croatia", 				"code": "HR", "bank_code_format": "0  7n 0 ", "account_format": "0  10n  0 " },
        { "country": "Hungary",  				"code": "HU", "bank_code_format": "0  3n 4n", "account_format": "1n 15n  1n" },
        { "country": "Ireland", 				"code": "IE", "bank_code_format": "0  4a 6n", "account_format": "0   8n  0 " },
        { "country": "Israel", 					"code": "IL", "bank_code_format": "0  3n 3n", "account_format": "0  13n  0 " },
        { "country": "Iceland",  				"code": "IS", "bank_code_format": "0  4n 0 ", "account_format": "2n 16n  0 " },
        { "country": "Italy",  					"code": "IT", "bank_code_format": "1a 5n 5n", "account_format": "0  12   0 " },
        { "country": "Kuwait", 					"code": "KW", "bank_code_format": "0  4a 0 ", "account_format": "0  22   0 " },
        { "country": "Kazakhstan", 				"code": "KZ", "bank_code_format": "0  3n 0 ", "account_format": "0  13   0 " },
        { "country": "Lebanon", 				"code": "LB", "bank_code_format": "0  4n 0 ", "account_format": "0  20   0 " },
        { "country": "Liechtenstein", 			"code": "LI", "bank_code_format": "0  5n 0 ", "account_format": "0  12   0 " },
        { "country": "Lithuania", 				"code": "LT", "bank_code_format": "0  5n 0 ", "account_format": "0  11n  0 " },
        { "country": "Luxembourg", 				"code": "LU", "bank_code_format": "0  3n 0 ", "account_format": "0  13   0 " },
        { "country": "Latvia", 					"code": "LV", "bank_code_format": "0  4a 0 ", "account_format": "0  13   0 " },
        { "country": "Monaco", 					"code": "MC", "bank_code_format": "0  5n 5n", "account_format": "0  11   2n" },
        { "country": "Montenegro", 				"code": "ME", "bank_code_format": "0  3n 0 ", "account_format": "0  13n  2n" },
        { "country": "Macedonia", 				"code": "MK", "bank_code_format": "0  3n 0 ", "account_format": "0  10   2n" },
        { "country": "Mauritania", 				"code": "MR", "bank_code_format": "0  5n 5n", "account_format": "0  11n  2n" },
        { "country": "Malta", 					"code": "MT", "bank_code_format": "0  4a 5n", "account_format": "0  18   0 " },
        { "country": "Mauritius", 				"code": "MU", "bank_code_format": "0  4a 4n", "account_format": "0  15n  3a" },
        { "country": "Netherlands", 			"code": "NL", "bank_code_format": "0  4a 0 ", "account_format": "0  10n  0 " },
        { "country": "Norway", 					"code": "NO", "bank_code_format": "0  4n 0 ", "account_format": "0   6n  1n" },
        { "country": "Poland", 					"code": "PL", "bank_code_format": "0  8n 0 ", "account_format": "0  16n  0 " },
        { "country": "Portugal", 				"code": "PT", "bank_code_format": "0  4n 4n", "account_format": "0  11n  2n" },
        { "country": "Romania", 				"code": "RO", "bank_code_format": "0  4a 0 ", "account_format": "0  16   0 " },
        { "country": "Serbia", 					"code": "RS", "bank_code_format": "0  3n 0 ", "account_format": "0  13n  2n" },
        { "country": "Saudi Arabia",  			"code": "SA", "bank_code_format": "0  2n 0 ", "account_format": "0  18   0 " },
        { "country": "Sweden", 					"code": "SE", "bank_code_format": "0  3n 0 ", "account_format": "0  16n  1n" },
        { "country": "Slovenia", 				"code": "SI", "bank_code_format": "0  5n 0 ", "account_format": "0   8n  2n" },
        { "country": "Slovak Republic",  		"code": "SK", "bank_code_format": "0  4n 0 ", "account_format": "0  16n  0 " },
        { "country": "San Marino",  			"code": "SM", "bank_code_format": "1a 5n 5n", "account_format": "0  12   0 " },
        { "country": "Tunisia", 				"code": "TN", "bank_code_format": "0  2n 3n", "account_format": "0  13n  2n" },
        { "country": "Turkey", 					"code": "TR", "bank_code_format": "0  5n 0 ", "account_format": "1  16   0 " }
    ];

    var IbanFormat = function (format) {

        var decodeCountryFormat = function (format) {
            var listOfFormats = [];
            var parts = format.split(" ");
            for (var i = 0; i < parts.length; ++i) {
                var part = parts[i];
                if (part !== "") {
                    var type = part.slice(-1);
                    if (type === "a" || type === "n") {
                        part = part.slice(0, -1);
                    } else {
                        type = "c";
                    }
                    listOfFormats[listOfFormats.length] = new Array(part |0, type);
                }
            }
            return listOfFormats;
        };

        var summerizeAllNumericValuesIn = function (list) {
            var sum = 0;
            for (var i = 0; i < list.length; ++i) {
                sum += list[i][0];
            }
            return sum;
        };

        this.country = format.country;
        this.code = format.code;
        this.bank = decodeCountryFormat(format.bank_code_format);
        this.bank_code_format = format.bank_code_format;
        this.account = decodeCountryFormat(format.account_format);
        this.account_format = format.account_format;
        this.bankLength = summerizeAllNumericValuesIn(this.bank);
        this.accountLength = summerizeAllNumericValuesIn(this.account);
        this.totalLength = 4 + this.bankLength + this.accountLength;
    };

    function convertToDigitString(account) {
        var digitString = '';
        for (var index = 0; index < account.length; index++) {
            var code = account[index].toUpperCase().charCodeAt(0);
            digitString += code < 65 ? account[index] : code - 55;
        }
        return digitString;
    }

    function mod97(digitString) {
        var m = 0;
        for (var i = 0; i < digitString.length; ++i) {
            m = ((m * 10) + (digitString[i] |0)) % 97;
        }
        return m;
    }

    function fillWithLeadingZeroBasedOnLength(string, length) {
        if (string === null) {
            string = '';
        }
        return string.length >= length ? string : new Array(length - string.length + 1).join('0') + string;
    }

    function addSpaceAfterNumCharacters(string, numCharacters) {
        var result = "";
        for (var i = 0; i < string.length; ++i) {
            if (i > 0 && i % numCharacters === 0) {
                result += " ";
            }
            result += string[i];
        }
        return result;
    }

    function getIbanFormatFrom(countryCode) {
        for (var index = 0; index < formats.length; index++) {
            var format = formats[index];
            if (format.code === countryCode) {
                return new IbanFormat(format);
            }
        }
        throw {
            type: 'IllegalCountryCodeError',
            message: 'Could not find IBAN format for country code: ' + countryCode
        };
    }

    function validateIbanLength(iban, country, countryCode) {
        if (country.totalLength !== iban.length) {
            throw {
                type: 'IllegalIbanLengthError',
                message: iban + ' is not the correct length based on the iban format for country ' + countryCode
            };
        }
    }

    function partIsInvalid(ibanPart, list) {
        for (var f = 0; f < list.length; ++f) {
            var length = list[f][0];
            var type = list[f][1];
            if (length > ibanPart.length) {
                length = ibanPart.length;
            }
            for (var i = 0; i < length; ++i) {
                var character = ibanPart[i];
                var a = ("A" <= character && character <= "Z");
                var n = ("0" <= character && character <= "9");
                var c = n || a || ("a" <= character && character <= "z");
                if ((!c && type === "c") || (!a && type === "a") || (!n && type === "n")) {
                    return true;
                }
            }
            ibanPart = ibanPart.substring(length);
        }
        return false;
    }

    function getAccountNumber(bankCode, accountNumber, ibanFormat) {
        var account;
        if (bankCode) {
            account = convertToDigitString(accountNumber);
        } else {
            account = convertToDigitString(accountNumber.substring(ibanFormat.bankLength));
        }
        if (partIsInvalid(accountNumber, ibanFormat.account)) {
            throw {
                type: 'IllegalAccountNumberError',
                message: accountNumber + ' is a invalid account number!'
            };
        }

        validateLength(account, ibanFormat.accountLength);
        return fillWithLeadingZeroBasedOnLength(account, ibanFormat.accountLength);
    }

    function getBankNumber(bankCode, accountNumber, ibanFormat) {
        var bankCodeString;

        if (bankCode) {
            bankCode = bankCode.toUpperCase();
            if (partIsInvalid(bankCode, ibanFormat.bank)) {
                throw {
                    type: 'IllegalBankCodeError',
                    message: bankCode + ' is an invalid bank code!'
                };
            }
            bankCodeString = bankCode;

        } else {
            var bankCodeFromAccount = accountNumber.substring(0, ibanFormat.bankLength);
            bankCodeString = bankCodeFromAccount;
        }
        validateLength(bankCodeString, ibanFormat.bankLength);
        return fillWithLeadingZeroBasedOnLength(bankCodeString, ibanFormat.bankLength);
    }

    function validateLength(string, length) {
        if (string.length !== length) {
            throw {
                type: 'IllegalLengthError',
                message: 'The value "' + string + '" is not the correct length based on the iban format for this country. Should have length ' + length
            };
        }
    }

    function calculateChecksum(bban) {
        return 98 - mod97(bban);
    }

    function getBBANFrom(bankCode, accountNumber, countryCode) {
        return convertToDigitString(bankCode) + convertToDigitString(accountNumber) + convertToDigitString(countryCode + '00');
    }

    function calculateIBAN(countryCode, checksum, bankNumberWithLeadingZeros, accountNumberWithLeadingZeros) {
        return countryCode + fillWithLeadingZeroBasedOnLength(checksum.toString(), 2) + bankNumberWithLeadingZeros.toUpperCase() + accountNumberWithLeadingZeros.toUpperCase();
    }

    function validateIBAN(iban) {
        var ccode = convertToDigitString(iban.substring(0, 4));
        var bban = iban.substring(4) + ccode;
        if (mod97(convertToDigitString(bban)) !== 1) {
            throw {
                type: 'ValidationError',
                message: 'Validating IBAN failed!'
            };
        }
    }

    function validateNotEmpty(value, type) {
        if (typeof value === 'undefined' || value === null || value === '') {
            throw {
                type: 'ValidationError',
                message: type + ' should be a value and not empty!'
            };
        }
    }

    function generateIBAN(ibanFormat, countryCode, bankCode, account) {

        var accountNumberWithLeadingZeros = getAccountNumber(bankCode, account, ibanFormat);
        var bankNumberWithLeadingZeros = getBankNumber(bankCode, account, ibanFormat);
        var bban = getBBANFrom(bankNumberWithLeadingZeros, accountNumberWithLeadingZeros, countryCode);

        var checksum = calculateChecksum(bban);

        var iban = calculateIBAN(countryCode, checksum, bankNumberWithLeadingZeros, accountNumberWithLeadingZeros);

        validateIbanLength(iban, ibanFormat, countryCode);
        validateIBAN(iban);
        return iban;
    }

    var IBAN = {

        /**
         * Generates the IBAN and returns an object with two callback functions, success and error. The success
         * callback is called if the iban-object was successfully created and has three attributes:
         *             - iban :             The IBAN printed as an electronic text with no space
         *             - iban_print :       The IBAN printed with space on evry 4th character
         *             - iban_format :      The IBAN format based on formats-variable at top of iban.js
         *
         * If the iban resulted in an error the error callback will be called with an object containing two
         * attributes:
         *                - type :             Type of the error
         *                - message :            The message containing details of what failed
         *
         * NB! If the bank code is null, the account number is the basis for collecting bank code
         *
         *
         * Usage:
         *
         * IBAN.generate(countryCode, bankCode, accountNumber)
         *       .success(function (iban) {
         *            // yey!!!
         *       })
         *       .error(function (error) {
         *            // doh...
         *       });
         *
         * @param countryCode Two character countrycode defined by ISO-standard
         * @param bankCode The bank code could be both alphanumeric characters A-Z and numbers
         * @param account The account number
         * @return object The resulting object with two function, success and error
         */
        generate: function (countryCode, bankCode, account) {
            var result;
            var successful = false;

            try {
                validateNotEmpty(countryCode, 'Country code');
                validateNotEmpty(account, 'Account number');

                var ibanFormat = getIbanFormatFrom(countryCode.toUpperCase());

                var iban = generateIBAN(ibanFormat, countryCode, bankCode, account);
                result = {
                    iban: iban,
                    iban_print: addSpaceAfterNumCharacters(iban, 4),
                    iban_format: ibanFormat
                };
                successful = true;

            } catch (e) {
                result = e;
            }
            var resultfunction = {
                success: function (callback) {
                    if (successful) {
                        callback(result);
                    }
                    return resultfunction; // enables the chaining
                },
                error: function (callback) {
                    if (!successful) {
                        callback(result);
                    }
                    return resultfunction; // enables the chaining
                }
            };

            return resultfunction;
        }
    };

    return IBAN;
});