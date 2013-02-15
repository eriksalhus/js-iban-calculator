define(['modules/model/iban'], function (IBAN) {
    describe("Create IBAN", function () {

        it("should return IBAN NO09 5231 1117 947 from  NO account number 52311117947", function () {
            expect(IBAN.generateIBAN('NO', null, '52311117947').iban).toBe('NO0952311117947');
            expect(IBAN.generateIBAN('NO', null, '52311117947').iban_print).toBe('IBAN NO09 5231 1117 947');
        });

        it("should return IBAN GB82 WEST 1234 5698 7654 32 from  United Kingdom account number 98765432 with bank and branch number WEST123456", function () {
            expect(IBAN.generateIBAN('GB', 'WEST123456', '98765432').iban).toBe('GB82WEST12345698765432');
            expect(IBAN.generateIBAN('GB', 'WEST123456', '98765432').iban_print).toBe('IBAN GB82 WEST 1234 5698 7654 32');
        });

        it("should return IBAN GB82 WEST 1234 5698 7654 32 from  United Kingdom account number 98765432 with bank and branch number west123456", function () {
            expect(IBAN.generateIBAN('GB', 'west123456', '98765432').iban).toBe('GB82WEST12345698765432');
            expect(IBAN.generateIBAN('GB', 'west123456', '98765432').iban_print).toBe('IBAN GB82 WEST 1234 5698 7654 32');
        });

        it("should return IBAN DK83 5290 0000 4444 22 from  DK account number 5290444422", function () {
            expect(IBAN.generateIBAN('DK', null, '5290444422').iban).toBe('DK8352900000444422');
            expect(IBAN.generateIBAN('DK', null, '5290444422').iban_print).toBe('IBAN DK83 5290 0000 4444 22');
        });

        it("should return IBAN IE29 AIBK 9311 5212 3456 78 from  Ireland account number 12345678 with bank and branch number AIBK931152", function () {
            expect(IBAN.generateIBAN('IE', 'AIBK931152', '12345678').iban).toBe('IE29AIBK93115212345678');
            expect(IBAN.generateIBAN('IE', 'AIBK931152', '12345678').iban_print).toBe('IBAN IE29 AIBK 9311 5212 3456 78');
        });

    });

    describe("Error management on input values", function () {

        it("should throw Error when country code is not valid or found in iban_formats.json", function () {
            var countryCode = 'NOT FOUND';
            expect(function () {
                IBAN.generateIBAN(countryCode, '0440', '52904444221').iban
            }).toThrow(new Error('Could not find IBAN format for country code: ' + countryCode));
        });

        it("should throw Error when iban result length is too long", function () {
            expect(function () {
                IBAN.generateIBAN('DK', '0440', '52904444221').iban
            }).toThrow(new Error('DK55044052904444221 is not the correct length based on the iban format for country DK'));
        });
    });

    describe("Error management on signature", function () {

        it("should throw Error when country code is empty", function () {
            expect(function () {
                IBAN.generateIBAN('', '0440', '52904444221').iban
            }).toThrow(new Error('Country code should be a value and not null!'));
        });

        it("should throw Error when country code is null", function () {
            expect(function () {
                IBAN.generateIBAN(null, '0440', '52904444221').iban
            }).toThrow(new Error('Country code should be a value and not null!'));
        });

        it("should throw Error when country code is undefined", function () {
            expect(function () {
                IBAN.generateIBAN(undefined, '0440', '52904444221').iban
            }).toThrow(new Error('Country code should be a value and not null!'));
        });
        it("should throw Error when account is empty", function () {
            expect(function () {
                IBAN.generateIBAN('DK', '0440', '').iban
            }).toThrow(new Error('Account number should be a value and not null!'));
        });

        it("should throw Error when account is null", function () {
            expect(function () {
                IBAN.generateIBAN('DK', '0440', null).iban
            }).toThrow(new Error('Account number should be a value and not null!'));
        });

        it("should throw Error when account is undefined", function () {
            expect(function () {
                IBAN.generateIBAN('DK', '0440', undefined).iban
            }).toThrow(new Error('Account number should be a value and not null!'));
        });
    });

});