import * as React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from 'components/Breadcrumb';
import {
  Route,
  Link
} from 'react-router-dom';
import _ from 'lodash';

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
);

const BreadcrumbsSSSSSSS = (props) => (
  <Breadcrumb className={'header-breadcrumb'}>
    <Route path="/:path" component={BreadcrumbsItem} />
  </Breadcrumb>
);

class HeaderBreadcrumbs extends React.Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //
  // }

  render() {
    const { pathname } = this.props.routing.location;
    const fuckBreadcrubms = pathname.split('/').filter((item) => {
      return item.length !== 0;
    });
    const getPathInfo = (path) => {
      return  _.compact(this.props.routing.location.pathname.split('/').map((p, i, arr) => {
        if (i === 0) return;
        // if (i === 0) return {
        //   key: i,
        //   content: (<Link to={'/'}>home</Link>),
        //   active: (i === arr.length - 1),
        //   link: (i < arr.length - 1)
        // };

        if (i === arr.length - 1) {
          return {
            key: i,
            name: p,
            active: (i === arr.length - 1),
            isLink: (i < arr.length - 1)
          };
        }

        return {
          key: i,
          name: p,
          link: arr.slice(0, i + 1).join('/'),
          active: (i === arr.length - 1),
          isLink: (i < arr.length - 1)
        };

      }))
    }

    console.log(getPathInfo(this.props.routing.location.pathname));
    const arr = [''];
    return (
      <div>
        <BreadcrumbsSSSSSSS />
        {/* <Breadcrumb className={'header-breadcrumb'}> */}
        {/* { */}
        {/* fuckBreadcrubms.map((item, index) => { */}
        {/* return ( */}
        {/* <React.Fragment key={item}> */}
        {/* <Breadcrumb.Section active={fuckBreadcrubms.length === index + 1}> */}
        {/* /!*<Link to={match.url || ''} className={da ? 'header-breadcrumb__active' : ''}>*!/ */}
        {/* /!*{upperCase(match.params.path)}*!/ */}
        {/* /!*</Link>*!/ */}
        {/* </Breadcrumb.Section> */}
        {/* {fuckBreadcrubms.length !== index + 1 ? <Breadcrumb.Divider /> : null} */}
        {/* </React.Fragment> */}

        {/* ) */}
        {/* }) */}
        {/* } */}
        {/* </Breadcrumb> */}
      </div>
    );
  }
}

export default connect(state => ({ routing: state.routing }), {

})(HeaderBreadcrumbs);

