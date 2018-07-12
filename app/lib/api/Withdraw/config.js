export default {
  // VIA BANK: INDIVIDUAL USER
  CREATE_REQUEST: '/bank-withdrawals',
  CALCULATE_COMMISSION: '/bank-withdrawals/calculate',

  // VIA BANK: NEED ACCESS
  ACCEPT_VIA_BANK: '/bank-withdrawals/{{requestIdentifier}}/accept',
  DECLINE_VIA_BANK: '/bank-withdrawals/{{requestIdentifier}}/decline',
  LIFT_LIMIT_FOR_WITHDRAWAL_VIA_BANK: '/bank-withdrawals/{{requestIdentifier}}/lift-limit',
  REJECT_LIMITED_WITHDRAWAL_VIA_BANK: '/bank-withdrawals/{{requestIdentifier}}/reject',
};
