import {
  SET_REQUISITES
} from './types';

export const setRequisites = (value) => ({
  type: SET_REQUISITES,
  payload: value,
});

export const pullRequisites = () => (dispatch, getState) => new Promise((resolve, reject) => {
  const {
    profile: {
      person
    }
  } = getState().Dashboard;
  const testRequisites = [
    { key: 'Intermediary', value: 'Jago' },
    { key: 'SWIFT', value: 'LTSDAWE12333' },
    { key: 'Intermediary’s Bank Account', value: '331231333311223333' },
    { key: 'Beneficiary’s Bank Address', value: '1st Volokolamsky pr., 10, bld. 1, Moscow, Russia' },
    { key: 'Beneficiary’s Bank SWIFT', value: 'TICSRUMM' },
    { key: 'Beneficiary’s Account', value: 'LT47656468787865' },
    { key: 'Beneficiary', value: `${person.namePlain.first} ${person.namePlain.last}` },
    { key: 'Payment Details', value: `Own funds transfer under Agreement № 5064218729 ${person.namePlain.first} ${person.namePlain.last}. Without VAT.` },
  ];

  setTimeout(() => {
    dispatch(setRequisites(testRequisites));
    resolve()
  }, 1000);
});
