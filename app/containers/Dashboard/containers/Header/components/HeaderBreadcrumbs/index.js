import * as React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from 'components/Breadcrumb';
import { Link } from 'react-router-dom';
import { getPathInfo } from 'lib/pathUtils';
import './style.scss';

const upperCase = (item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`;

type Props = {
  routing: {
    location: {
      pathname: string
    }
  }
};

class HeaderBreadcrumbs extends React.Component<Props> {

  render() {

    const { pathname } = this.props.routing.location;

    const breadcrumbsList = getPathInfo(pathname);

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

