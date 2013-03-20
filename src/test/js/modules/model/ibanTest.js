define(['modules/model/iban'], function (IBAN) {
	describe("Create IBAN", function () {

		it("should return NO09 5231 1117 947 from  NO account number 52311117947", function () {
			IBAN.generate('NO', null, '52311117947')
				.success(function (iban) {
					expect(iban.iban).toBe('NO0952311117947');
					expect(iban.iban_print).toBe('NO09 5231 1117 947');
				});
		});

		it("should return GB82 WEST 1234 5698 7654 32 from  United Kingdom account number 98765432 with bank and branch number WEST123456", function () {
			IBAN.generate('GB', 'WEST123456', '98765432')
				.success(function (iban) {
					expect(iban.iban).toBe('GB82WEST12345698765432');
					expect(iban.iban_print).toBe('GB82 WEST 1234 5698 7654 32');
				});
		});

		it("should return GB82 WEST 1234 5698 7654 32 from  United Kingdom account number 98765432 with bank and branch number west123456", function () {
			IBAN.generate('GB', 'west123456', '98765432')
				.success(function (iban) {
					expect(iban.iban).toBe('GB82WEST12345698765432');
					expect(iban.iban_print).toBe('GB82 WEST 1234 5698 7654 32');
				});
		});

		it("should return DK83 5290 0000 4444 22 from  DK account number 5290444422", function () {
			IBAN.generate('DK', '3000', '3161123456')
				.success(function (iban) {
					expect(iban.iban).toBe('DK2330003161123456');
					expect(iban.iban_print).toBe('DK23 3000 3161 1234 56');
				});
		});

		it("should return IE29 AIBK 9311 5212 3456 78 from  Ireland account number 12345678 with bank and branch number AIBK931152", function () {
			IBAN.generate('IE', 'AIBK931152', '12345678')
				.success(function (iban) {
					expect(iban.iban).toBe('IE29AIBK93115212345678');
					expect(iban.iban_print).toBe('IE29 AIBK 9311 5212 3456 78');
				});
		});

	});

	describe("Error management on input values", function () {

		it("should throw Error when country code is not valid or found in formats at top of iban.js", function () {
			var countryCode = 'NOT FOUND';
			IBAN.generate(countryCode, '0440', '52904444221')
				.error(function (error) {
					expect(error.type).toBe("IllegalCountryCodeError");
					expect(error.message).toBe("Could not find IBAN format for country code: " + countryCode);
				});
		});

		it("should throw Error when the account number has incorrect num values", function () {
			IBAN.generate('NO', '0440', '5252')
				.error(function (error) {
					expect(error.type).toBe('IllegalLengthError');
					expect(error.message).toBe('The value "5252" is not the correct length based on the iban format for this country. Should have length 7');
				});
		});

		it("should throw Error when the bank number has incorrect num values", function () {
			IBAN.generate('DK', '123', '3161123456')
				.error(function (error) {
					expect(error.type).toBe('IllegalLengthError');
					expect(error.message).toBe('The value "123" is not the correct length based on the iban format for this country. Should have length 4');
				});
		});
	});

	describe("Error management on signature", function () {

		it("should throw Error when country code is empty", function () {
			IBAN.generate('', '0440', '52904444221')
				.error(function (error) {
					expect(error.type).toBe('ValidationError');
					expect(error.message).toBe('Country code should be a value and not empty!');
				});

		});


		it("should throw Error when country code is null", function () {
			IBAN.generate(null, '0440', '52904444221')
				.error(function (error) {
					expect(error.type).toBe('ValidationError');
					expect(error.message).toBe('Country code should be a value and not empty!');
				});
		});

		it("should throw Error when country code is undefined", function () {
			IBAN.generate(undefined, '0440', '52904444221')
				.error(function (error) {
					expect(error.type).toBe('ValidationError');
					expect(error.message).toBe('Country code should be a value and not empty!');
				});
		});

		it("should throw Error when account is empty", function () {
			IBAN.generate('DK', '0440', '')
				.error(function (error) {
					expect(error.type).toBe('ValidationError');
					expect(error.message).toBe('Account number should be a value and not empty!');
				});

		});

		it("should throw Error when account is null", function () {
			IBAN.generate('DK', '0440', null)
				.error(function (error) {
					expect(error.type).toBe('ValidationError');
					expect(error.message).toBe('Account number should be a value and not empty!');
				});
		});

		it("should throw Error when account is undefined", function () {
			IBAN.generate('DK', '0440', undefined)
				.error(function (error) {
					expect(error.type).toBe('ValidationError');
					expect(error.message).toBe('Account number should be a value and not empty!');
				});
		});
	});

});