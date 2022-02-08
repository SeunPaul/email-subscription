const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "c391ce8d33ccade56b96f43409b2a24e-us14",
    server: "us14",
  });


module.exports = mailchimp;
