export default {
  // TOP UP CARDS
  GET_PAYMENT_PROVIDERS: '/gate/methods/view', // STEP 1
  CALCULATE_COMMISSION: '/gate/transactions/calculate', // STEP 2 (no optional)
  CREATE_TRANSACTION: '/gate/transactions', // STEP 3
  GET_LIST_PAYER_FIELDS: '/gate/transactions/{tx}/payer-fields', // STEP 4
  SUBMIT_PAYER_DATA: '/gate/transactions/{tx}/submit', // STEP 5
  GET_TRANSACTION_STATE: '/gate/transactions/{tx}', // STEP 6
};
