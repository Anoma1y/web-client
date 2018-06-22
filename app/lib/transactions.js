export const TRANSACTION_STATUSES = [
  {
    type: 'limited',
    description: 'Limit is exceeded',
    selected: true
  },
  {
    type: 'pending',
    description: 'Pending',
    selected: true
  },
  {
    type: 'declined',
    description: 'Declined',
    selected: true
  },
  {
    type: 'processed',
    description: 'Success',
    selected: true
  },
  {
    type: 'rejected',
    description: 'Rejected',
    selected: true
  },
  {
    type: 'error',
    description: 'Error',
    selected: true
  }
];

export const TRANSACTION_TYPES = [
  {
    type: 'client_transaction_split',
    description: '',
    selected: false
  },
  {
    type: 'client_transaction_merge',
    description: '',
    selected: false
  },
  {
    type: 'client_transaction_issue',
    description: '',
    selected: false
  },
  {
    type: 'client_transaction_balance',
    description: '',
    selected: false
  },
  {
    type: 'client_transaction_redeem',
    description: '',
    selected: false
  },
  {
    type: 'client_transaction_transfer',
    description: 'Transfer',
    selected: true
  },
  {
    type: 'client_create_prepaid',
    description: 'Created voucher',
    selected: true
  },
  {
    type: 'client_charge_prepaid',
    description: 'Charge voucher',
    selected: true
  },
  {
    type: 'merchant_payment',
    description: 'Merchant payment',
    selected: true
  },
  {
    type: 'merchant_invoice',
    description: 'Payment invoice',
    selected: true
  },
  {
    type: 'gate_charge',
    description: 'Charge wallet',
    selected: true
  },
  {
    type: 'gate_redeem',
    description: 'Redeem',
    selected: true
  },
  {
    type: 'gate_purchase',
    description: 'Payment for goods',
    selected: true
  },
  {
    type: 'gate_card_refund',
    description: 'Refund of card payment',
    selected: true
  },
  {
    type: 'gate_card_verification',
    description: 'Payment card verification',
    selected: true
  },
  {
    type: 'exchange_transaction',
    description: 'Exchange',
    selected: true
  },
  {
    type: 'cash_desk_redeem',
    description: 'Redeem through cash desk',
    selected: true
  },
  {
    type: 'cash_desk_charge',
    description: 'Charge through cash desk',
    selected: true
  },
  {
    type: 'payroll_charge',
    description: 'Charge payroll',
    selected: true
  },
  {
    type: 'contract_transit',
    description: 'Swich contract',
    selected: true
  },
  {
    type: 'merchant_cashback',
    description: 'Cashback',
    selected: true
  },
  {
    type: 'deposit_topup',
    description: 'Deposit top up',
    selected: true
  },
  {
    type: 'deposit_profit_payment',
    description: 'Deposit profit payment',
    selected: true
  },
  {
    type: 'deposit_payout',
    description: 'Deposit payout',
    selected: true
  },
  {
    type: 'deposit_capitalization',
    description: 'Deposit profit capitalization',
    selected: true
  },
  {
    type: 'deposit_accruing',
    description: 'Deposit profit accruing',
    selected: true
  },
  {
    type: 'credit_issue',
    description: 'Credit issue',
    selected: true
  },
  {
    type: 'credit_payment',
    description: 'Credit payment',
    selected: true
  },
  {
    type: 'bank_topup',
    description: 'Topup via bank',
    selected: true
  },
  {
    type: 'bank_redeem',
    description: 'Redeem via bank',
    selected: true
  }
];
