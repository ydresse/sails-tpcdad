const mailgun = require('mailgun-js')({
  apiKey: 'fedbe91ae5e3529f94528dd311bea4c9-060550c6-d42c872f', 
  domain: 'mailgun.l3o.eu'});
  module.exports = {


    friendlyName: 'Send single email',
    
    
    description: '',
    
    
    inputs: {
    options:{
      type:'json'
     }
    },
    
    
    exits: {
    
    },
    
    
    fn: async function (inputs, exits) {
    
    mailgun.messages().send(inputs.options, function (error, body) {
      if(error){
        return exits.error(error)
      }
    
      // All done.
    return exits.success(body);
    
    
    });
    
    }
    
    
    };
