Javascript IBAN Calculator
==================




```javascript
IBAN.generateIBAN('NO', null, '52311117947')
// returns object:
// {
//      iban:         'NO0952311117947',
//      iban_print:   'IBAN NO09 5231 1117 947',
//      format:       IbanFormat
// }
IBAN.generateIBAN('GB', 'WEST123456', '98765432')
// returns object:
// {
//      iban:         'GB82WEST12345698765432',
//      iban_print:   'IBAN GB82 WEST 1234 5698 7654 32',
//      format:       IbanFormat
// }
```
