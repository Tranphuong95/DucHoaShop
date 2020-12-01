import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Home from 'app/modules/home/home';
import Products1 from 'app/modules/do-go-noi-that/do-go-noi-that-1/do-go-noi-that-1';

import Productdetail from './productdetail';
import Model from './model';
import Productmanager from './productmanager';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}productdetail`} component={Productdetail} />
      <ErrorBoundaryRoute path={`${match.url}model`} component={Model} />
      <ErrorBoundaryRoute path={`${match.url}productmanager`} component={Productmanager} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      <ErrorBoundaryRoute path="/" exact component={Home} />
      <ErrorBoundaryRoute path="/products" exact component={Products1} />
    </Switch>
  </div>
);

export default Routes;
