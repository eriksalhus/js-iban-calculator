/**
    Javascript IBAN Calculator
    Copyright (C) 2013 Erik Salhus (erik.salhus@gmail.com)

    Based on iban.js 1.5 developed by Thomas Gunther tom@toms-cafe.de
    Copyright (C) 2002-2010, Thomas Günther (tom@toms-cafe.de)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/.
 */
define(['json!modules/model/iban_formats.json'],
    function (formats) {

        var IbanFormat = function (format) {

            var decodeCountryFormat = function (format) {
                var listOfFormats = [];
                var parts = format.split(" ");
                for (var i = 0; i < parts.length; ++i) {
                    var part = parts[i];
                    if (part !== "") {
                        var type = part.charAt(part.length - 1);
                        if (type === "a" || type === "n") {
                            part = part.substring(0, part.length - 1);
                        } else {
                            type = "c";
                        }
                        listOfFormats[listOfFormats.length] = new Array(parseInt(part, 10), type);
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

        function capital2digits(character) {
            var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var i = 0; i < capitals.length; ++i) {
                if (character === capitals.charAt(i)) {
                    break;
                }
            }
            return i + 10;
        }

        function convertToDigitString(account) {
            var digitString = '';
            for (var index = 0; index < account.length; index++) {
                var character = account.charAt(index).toUpperCase();
                if (character >= '0' && character <= '9') {
                    digitString += character.toString();
                    continue;
                }
                digitString += capital2digits(character.toString());
            }
            return digitString;
        }

        function mod97(digitString) {
            var m = 0;
            for (var i = 0; i < digitString.length; ++i) {
                m = ((m * 10) + parseInt(digitString.charAt(i), 10)) % 97;
            }
            return m;
        }

        function fillWithLeadingZeroBasedOnLength(string, length) {
            if (string === null) {
                string = '';
            }
            while (string.length < length) {
                string = "0" + string;
            }
            return string;
        }

        function addSpaceAfterNumCharacters(string, numCharacters) {
            var result = "IBAN";
            for (var i = 0; i < string.length; ++i) {
                if (i % numCharacters === 0) {
                    result += " ";
                }
                result += string.charAt(i);
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
            throw new Error('Could not find IBAN format for country code: ' + countryCode);
        }

        function validateLength(iban, country, countryCode) {
            if (country.totalLength !== iban.length) {
                throw new Error(iban + ' is not the correct length based on the iban format for country ' + countryCode);
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
                    var character = ibanPart.charAt(i);
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
                throw new Error(accountNumber + ' is a invalid account number!');
            }
            return fillWithLeadingZeroBasedOnLength(account, ibanFormat.accountLength);
        }

        function getBankNumber(bankCode, accountNumber, ibanFormat) {
            if (bankCode) {
                bankCode = bankCode.toUpperCase();
                if (partIsInvalid(bankCode, ibanFormat.bank)) {
                    throw new Error(bankCode + ' is an invalid bank code!');
                }
                return fillWithLeadingZeroBasedOnLength(bankCode, ibanFormat.bankLength);
            } else {
                var bankCodeFromAccount = accountNumber.substring(0, ibanFormat.bankLength);
                return fillWithLeadingZeroBasedOnLength(bankCodeFromAccount, ibanFormat.bankLength);
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
                throw new Error('Validating IBAN failed!');
            }
        }

        function validateNotEmpty(value, type) {
            if (typeof value === 'undefined' || value === null || value === '') {
                throw new Error(type + ' should be a value and not null!');
            }
        }

        var IBAN = {

            /**
             * Generates the IBAN and returns an object with two attributes:
             *         - iban :         The IBAN printed as an electronic text with no space
             *         - iban_print :   The IBAN printed with space on evry 4th character
             *         - iban_format :    The IBAN format based on iban_formats.json
             *
             * NB! If the bank code is null, the account number is the basis for collecting bank code
             *
             * @param countryCode Two character countrycode defined by ISO-standard
             * @param bankCode The bank code could be both alphanumeric characters A-Z and numbers
             * @param account The account number
             * @return {{iban: *, iban_print: *}}
             */
            generateIBAN: function (countryCode, bankCode, account) {
                validateNotEmpty(countryCode, 'Country code');
                validateNotEmpty(account, 'Account number');

                var ibanFormat = getIbanFormatFrom(countryCode.toUpperCase());

                var accountNumberWithLeadingZeros = getAccountNumber(bankCode, account, ibanFormat);
                var bankNumberWithLeadingZeros = getBankNumber(bankCode, account, ibanFormat);
                var bban = getBBANFrom(bankNumberWithLeadingZeros, accountNumberWithLeadingZeros, countryCode);

                var checksum = calculateChecksum(bban);

                var iban = calculateIBAN(countryCode, checksum, bankNumberWithLeadingZeros, accountNumberWithLeadingZeros);

                validateLength(iban, ibanFormat, countryCode);
                validateIBAN(iban);

                return {
                    iban: iban,
                    iban_print: addSpaceAfterNumCharacters(iban, 4),
                    iban_format: ibanFormat
                };
            }
        };

        return IBAN;
    });