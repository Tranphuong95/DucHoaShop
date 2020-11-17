import './list-products.scss'
import React, { useState } from 'react';
import {ListGroupProducts} from "app/shared/layout/group-list-products/list-group-products-component";
import Home from "app/modules/home/home";
import ErrorBoundaryRoute from "app/shared/error/error-boundary-route";
import {HomeHead} from "app/modules/home/HomeHead";

export const ListProducts=(props)=>{
  return(
    <div className="list-group-products d-flex justify-content-center">
      <div className="list-products-container d-flex col-10">
        <ListGroupProducts/>
        <div>
          <ErrorBoundaryRoute path="/" exact component={HomeHead} />
        </div>
      </div>
    </div>
  )
}