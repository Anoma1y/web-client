import React from 'react';
import { connect } from 'react-redux';
import Text from 'components/Text';
import Amount from 'components/Amount';
import Icon from 'components/Icon';
import './style.scss';

const renderMasterCard = () => (
  <div className={'wallet-icon wallet-card'}>
    <Icon name={'mastercard'} size={35} />
  </div>
);

const renderVisa = () => (
  <div className={'wallet-icon wallet-card'}>
    <Icon name={'visa'} size={35} />
  </div>
);

@connect((state) => ({ Dashboard_Sidebar: state.Dashboard_Sidebar }) )
export default class SidebarCard extends React.Component {
  render() {
    return (
      <div>1</div>
      {/*<div className={'sidebar-wallets'}>*/}
        {/*{*/}
          {/*this.props.Dashboard_Sidebar.cards.map((item) => {*/}
            {/*return (*/}
              {/*<div className={'sidebar-wallet sidebar-container'}>*/}
                {/*<div className={'sidebar-wallet_icon sidebar-container_icon'}>*/}
                  {/*{renderMasterCard()}*/}
                {/*</div>*/}
                {/*<div className={'sidebar-wallet_content sidebar-container_content'}>*/}
                  {/*<Text className={'wallet-amount'}>*/}
                    {/*<Text.Content className={'wallet-amount_name'}>*/}
                      {/*{`**** ${item.last4Digits}`}*/}
                    {/*</Text.Content>*/}
                    {/*<Text.Sub className={'wallet-amount_value'}>*/}
                      {/*<Amount value={52354234.22} />*/}
                    {/*</Text.Sub>*/}
                  {/*</Text>*/}
                {/*</div>*/}
                {/*<div className={'sidebar-wallet_btn sidebar-container_btn'}>*/}
                  {/*<span>...</span>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*)*/}
          {/*})*/}
        {/*}*/}
      {/*</div>*/}
    );
  }
};
