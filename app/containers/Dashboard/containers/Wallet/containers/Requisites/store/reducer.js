const INITIAL_STATE = {
  requisites: [
    { key: 'Intermediary', value: 'Jago' },
    { key: 'SWIFT', value: '1213211321' },
    { key: 'Intermediary’s Bank Account', value: '53453452233' },
    { key: 'Beneficiary’s Bank Address', value: '1st Volokolamsky pr., 10, bld. 1, Moscow, Russia' },
    { key: 'Beneficiary’s Bank SWIFT', value: 'TICSRUMM' },
    { key: 'Beneficiary’s Account', value: 'LT47656468787865' },
    { key: 'Beneficiary', value: 'name surname' },
    { key: 'Payment Details', value: 'Own funds transfer under Agreement № 5064218729 name surname. Without VAT.' },
  ]
}

const HANDLERS = {

}

export default (state = INITIAL_STATE, action) => (
  action.type in HANDLERS ? HANDLERS[action.type](state, action) : state
);
