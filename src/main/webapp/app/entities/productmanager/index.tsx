import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Productmanager from './productmanager';
import ProductmanagerDetail from './productmanager-detail';
import ProductmanagerUpdate from './productmanager-update';
import ProductmanagerDeleteDialog from './productmanager-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductmanagerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductmanagerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductmanagerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Productmanager} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProductmanagerDeleteDialog} />
  </>
);

export default Routes;
