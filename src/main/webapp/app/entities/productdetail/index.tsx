import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Productdetail from './productdetail';
import ProductdetailDetail from './productdetail-detail';
import ProductdetailUpdate from './productdetail-update';
import ProductdetailDeleteDialog from './productdetail-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductdetailUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductdetailUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductdetailDetail} />
      <ErrorBoundaryRoute path={match.url} component={Productdetail} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProductdetailDeleteDialog} />
  </>
);

export default Routes;
