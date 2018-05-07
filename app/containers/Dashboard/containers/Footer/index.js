import * as React from 'react';
import './style.scss';

export default () => {

  return (
    <div className={'footer'}>

      <div className={'footer-container'}>

        <div className={'footer-pay-systems'}>

          <div className={'footer-pay-systems_item'}>
            <img src={'/static/images/ssl-min.png'} alt="PCI" />
          </div>
          <div className={'footer-pay-systems_item'}>
            <img src={'/static/images/visa-footer-min.png'} alt="VISA" />
          </div>
          <div className={'footer-pay-systems_item'}>
            <img src={'/static/images/mc-footer-min.png'} alt="MASTERCARD" />
          </div>

        </div>

        <div className={'footer-copyright'}>

          <div className={'footer-copyright_logo'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" ><rect id="backgroundrect" width="26.958163040576228" height="25.096514056764512" x="0" y="0.5347593426704407" fill="none" stroke="none" /><g><title>Layer 1</title><g fill="none" fillRule="evenodd" id="svg_1"><path fill="#019BE1" d="M26.233 17.125l4.753-2.598v11.881a7.131 7.131 0 0 1-9.505 6.722 7.131 7.131 0 0 1-4.753-6.722v.222l4.753-2.598v2.376a2.376 2.376 0 1 0 4.752 0v-9.283z" id="svg_2" /><path fill="#019BE1" d="M6.13 31.141c-3.517-8.77-.01-19.012 8.51-23.735 8.521-4.723 19.065-2.27 24.64 5.36l4.208-2.333C36.618.513 23.167-2.754 12.336 3.25 1.506 9.253-2.852 22.391 1.922 33.474l4.208-2.333zM41.584 16.923c3.517 8.77.01 19.012-8.51 23.735-8.521 4.723-19.065 2.27-24.64-5.36L4.226 37.63c6.87 9.92 20.321 13.188 31.151 7.184 10.83-6.004 15.189-19.142 10.415-30.225l-4.208 2.333z" id="svg_3" /></g></g></svg>
          </div>
          <div className={'footer-copyright_content'}>
            <p>© 2017. All rights reserved.</p>
            <p>See our Terms of Use and Privacy Policy</p>
          </div>

        </div>

      </div>

    </div>
  );
};
