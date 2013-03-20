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
				var self = this;

				IBAN.generate(countryCode, bankCode, accountNumber)
					.success(function (iban) {
						self.$('.iban-result').html(ibanFormatTemplate(iban));
					})
					.error(function (error) {
						self.$('.iban-result').html(error.type + ': ' + error.message);
					});
			},

			fillFields: function (event) {
				this.$('.country_code').val(this.$('.' + event.target.className).attr('data-country'));
				this.$('.bank_code').val(this.$('.' + event.target.className).attr('data-bank'));
				this.$('.account_number').val(this.$('.' + event.target.className).attr('data-account'));
			}
		});

		return App;

	});
