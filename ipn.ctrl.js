 
const Const_PaypalWebAccept=1;
const Const_PaypalSubscriptionPayment=2;
const Const_PaypalSubscriptionSignUp=3;
const Const_PaypalSubscriptionCancel=4;
const Const_PaypalSubscriptionEot=5;
const Const_PaypalErrorValidatingIPN=10; 
const Const_PaypalProcessError=11; 
const Const_PaypalRecurringPaymentSuspended=12;
const Const_PaypalrecurringPaymentSuspendedDueToMaxFailedPayment=13;  
const Const_PaypalUnhandledTransactionType=14;
 
class IPNController { 

    static async runIt(req, res,callbackFunction) {
      // Send 200 status back to PayPal
      res.status(200).send('OK');
      res.end();
  
      const body = req.body || {};
  
      // Validate IPN message with PayPal
      try {
        const isValidated = await PayPalService.validate(body);
        if (!isValidated) {
          console.error('Error validating IPN message.');
          return callbackFunction(Const_PaypalErrorValidatingIPN);
        }
        
        // IPN Message is validated!
        const transactionType = body.txn_type;
        
        switch (transactionType) {
          case 'web_accept':{

            const status = body.payment_status;
            const amount = body.mc_gross;
            // Validate that the status is completed, 
            // and the amount match your expectaions.
            return callbackFunction(Const_PaypalWebAccept);
            break;
          }
          case 'subscr_payment':{
            const status = body.payment_status;
            const amount = body.mc_gross;
            // Validate that the status is completed, 
            // and the amount match your expectaions.
            return callbackFunction(Const_PaypalSubscriptionPayment);
            break;
          }
          case 'subscr_signup':
            return callbackFunction(Const_PaypalSubscriptionSignUp);
            break;
          case 'subscr_cancel':
            return callbackFunction(Const_PaypalSubscriptionCancel);
            break;
          case 'subscr_eot':
            // Update user profile
            return callbackFunction(Const_PaypalSubscriptionEot);
            break;
          case 'recurring_payment_suspended':
            return callbackFunction(Const_PaypalRecurringPaymentSuspended);
            break;
          case 'recurring_payment_suspended_due_to_max_failed_payment':  
            // Contact the user for more details
       
            return callbackFunction(Const_PaypalrecurringPaymentSuspendedDueToMaxFailedPayment);
            break;
          default:
            console.log('Unhandled transaction type: ', transactionType);
            return callbackFunction(Const_PaypalUnhandledTransactionType);
            break;
        }
      } catch(e) {
        console.error(e); 
        return callbackFunction(Const_PaypalProcessError);
      }
    }
  
  }
  module.exports=IPNController;
  //export default IPNController;