import * as React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from 'components/Breadcrumb';
import {
  Route,
  Link
} from 'react-router-dom';

const upperCase = (item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`;

const BreadcrumbsItem = ({ match, history }) => (
  <React.Fragment>
    <Breadcrumb.Section active={match.isExact}>
      <Link to={match.url || ''} className={match.isExact ? 'header-breadcrumb__active' : ''}>
        {upperCase(match.params.path)}
      </Link>
      <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
    </Breadcrumb.Section>
  </React.Fragment>
)

const BreadcrumbsSSSSSSS = (props) => (
  <Breadcrumb className={'header-breadcrumb'}>
    <Route path='/:path' component={BreadcrumbsItem} />
  </Breadcrumb>
)

class HeaderBreadcrumbs extends React.Component {

  render() {
    console.log(' ')
    const { pathname } = this.props.routing.location;
    const fuckBreadcrubms = pathname.split('/').filter((item) => {
      return item.length !== 0;
    })
    const da = false;
    // console.log(this.props)
    let arr = [''];
    return (
      <div>
        <BreadcrumbsSSSSSSS />
        {/*<Breadcrumb className={'header-breadcrumb'}>*/}
          {/*{*/}
            {/*fuckBreadcrubms.map((item, index) => {*/}
              {/*return (*/}
                {/*<React.Fragment key={item}>*/}
                  {/*<Breadcrumb.Section active={fuckBreadcrubms.length === index + 1}>*/}
                    {/*/!*<Link to={match.url || ''} className={da ? 'header-breadcrumb__active' : ''}>*!/*/}
                      {/*/!*{upperCase(match.params.path)}*!/*/}
                    {/*/!*</Link>*!/*/}
                  {/*</Breadcrumb.Section>*/}
                  {/*{fuckBreadcrubms.length !== index + 1 ? <Breadcrumb.Divider /> : null}*/}
                {/*</React.Fragment>*/}

              {/*)*/}
            {/*})*/}
          {/*}*/}
        {/*</Breadcrumb>*/}
      </div>
    );
  }
}

export default connect(state => ({ routing: state.routing }), {

})(HeaderBreadcrumbs);

