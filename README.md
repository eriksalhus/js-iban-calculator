Javascript IBAN Calculator
==================

Generates the IBAN and returns an object with two callback functions, success and error. The success
callback is called if the iban-object was successfully created and has three attributes:
    - iban :             The IBAN printed as an electronic text with no space
    - iban_print :       The IBAN printed with space on evry 4th character
    - iban_format :      The IBAN format based on formats-variable at top of iban.js

If the iban resulted in an error the error callback will be called with an object containing two
attributes:
    - type :             Type of the error
    - message :            The message containing details of what failed

NB! If the bank code is null, the account number is the basis for collecting bank code

Usage:

```javascript
IBAN.generate(countryCode, bankCode, accountNumber)
      .success(function (iban) {
           // yey!!!
      })
      .error(function (error) {
           // doh...
      });
```
