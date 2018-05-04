import * as React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from 'components/Breadcrumb';
import { Link } from 'react-router-dom';
import {
  getPathInfo,
  upperFirstCase
} from 'lib/pathUtils';
import './style.scss';

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
                    {upperFirstCase(item.name)}
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

