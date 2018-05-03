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
      return _.compact(this.props.routing.location.pathname.split('/').map((p, i, arr) => {
        if (p !== '') {
          let link = arr.slice(0, i + 1).join('/');

          if (link.charAt(link.length - 1) !== '/') {
            link = `${link}/`;
          }

          return {
            key: i,
            name: p,
            link
          };

        }
      }));
    };
    const breadcrumbsList = getPathInfo(this.props.routing.location.pathname);

    return (
      <div>
        <Breadcrumb className={'header-breadcrumb'}>
          {
            breadcrumbsList.map((item, index) => {
              return (
                <Breadcrumb.Section key={item.key} active={breadcrumbsList.length === index + 1}>
                  <Link to={item.link} className={breadcrumbsList.length === index + 1 ? 'header-breadcrumb__active' : ''}>
                    {upperCase(item.name)}
                  </Link>
                </Breadcrumb.Section>
              )
            })
          }
        </Breadcrumb>
      </div>
    );
  }
}

export default connect(state => ({ routing: state.routing }), {

})(HeaderBreadcrumbs);

