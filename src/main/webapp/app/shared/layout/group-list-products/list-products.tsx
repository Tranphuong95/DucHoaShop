import './list-products.scss'
import React from 'react';
import {ListGroupProducts} from "app/shared/layout/group-list-products/list-group-products-component";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";
import Homehead from "app/modules/home/homehead";
import {ProductsIndex} from "app/modules/do-go-noi-that/config-products";

export const ListProducts=(props)=>{
  return(
    <div className="list-group-products d-flex justify-content-center">
      <div className="list-products-container d-flex col-12 col-sm-11 -col-md-10 col-lg-10 col-xl-10">
        <ListGroupProducts/>
        <div className="contain-home-head col-12 s-flex col-sm-12 col-md-12 col-lg-9 col-xl-9">
          <ErrorBoundaryRoute path="/" exact component={Homehead} />
          <ErrorBoundaryRoute path="/products" exact component={ProductsIndex} />
        </div>
      </div>
    </div>
  )
}