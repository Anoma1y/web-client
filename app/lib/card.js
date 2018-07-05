export const CARD_STATUSES = {
  WAITING_FOR_CARDHOLDER_DETAILS: 'Waiting the details',
  CONFIRMED_BY_CARDHOLDER: 'Card are confirmed',
  INACTIVE: 'Inactive',
  ACTIVE: 'Active'
};

export const CARD_TYPE = {
  PLASTIC_PERSONIFIED: 'Plastic personified card',
  PLASTIC_NON_PERSONIFIED: 'Plastic non-personified card',
  VIRTUAL_PERSONIFIED: 'Virtual personified card',
  VIRTUAL_NON_PERSONIFIED: 'Virtual non-personified card'
};

export const getCardStatus = (status) => CARD_STATUSES[status] || 'Inactive status';

export const getCardType = (type) => CARD_TYPE[type] || 'Inactive type';
