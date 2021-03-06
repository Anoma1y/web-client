import React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from 'components/Breadcrumb';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  getPathInfo,
  upperFirstCase
} from 'lib/pathUtils';
import './style.scss';

const HeaderBreadcrumbs = (props) => {

  const { pathname } = props.routing.location;
  const breadcrumbsList = getPathInfo(pathname);

  const renderSection = () => {
    return breadcrumbsList.map((item, index) => {

      const linkName = upperFirstCase(item.name);
      return (
        <Breadcrumb.Section
          key={item.key}
          className={breadcrumbsList.length === index + 2 ? 'breadcrumb_section__last' : ''}
          active={breadcrumbsList.length === index + 1}
        >
          {
            index !== breadcrumbsList.length - 1 ?

              <Link to={item.link}> {linkName}</Link>

              : <div>{linkName}</div>

          }
        </Breadcrumb.Section>
      );
    });
  };

  return (
    <Grid>
      <Breadcrumb className={'breadcrumb-area'}>
        {renderSection()}
      </Breadcrumb>
    </Grid>
  );
};

export default connect((state) => ({ routing: state.routing }), {})(HeaderBreadcrumbs);

