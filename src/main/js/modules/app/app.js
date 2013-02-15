define(['backbone', 'modules/model/iban', 'hb!modules/app/app', 'hb!modules/app/ibanformat'],
    function (Backbone, IBAN, appTemplate, ibanFormatTemplate) {

        var App = Backbone.View.extend({
            template: appTemplate,

            events: {
                "click .create": "create",
                "click .gb-sample": "fillFields",
                "click .no-sample": "fillFields",
                "click .dk-sample": "fillFields"
            },

            run: function () {
                this.$el.html(this.template());

            },

            create: function () {
                var countryCode = this.$('.country_code').val();
                var bankCode = this.$('.bank_code').val();
                var accountNumber = this.$('.account_number').val();

                try {
                    this.$('.iban-result').html(ibanFormatTemplate(IBAN.generateIBAN(countryCode, bankCode, accountNumber)));
                } catch (e) {
                    this.$('.iban-result').html(e.message);
                }
            },

            fillFields: function (event) {
                this.$('.country_code').val(this.$('.' + event.target.className).attr('data-country'));
                this.$('.bank_code').val(this.$('.' + event.target.className).attr('data-bank'));
                this.$('.account_number').val(this.$('.' + event.target.className).attr('data-account'));
            }
        });

        return App;

    });
