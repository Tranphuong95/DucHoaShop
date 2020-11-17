import './list-products.scss'
import React, { useState } from 'react';
import {ListGroupProducts} from "app/shared/layout/group-list-products/list-group-products-component";

export const ListProducts=(props)=>{
  return(
    <div className=" d-flex justify-content-center">
      <div className="list-products-container d-flex col-10">
        <ListGroupProducts/>
        <div className="banner-img ml-4 mt-3">
          <img className="img-fluid" src="content/images/banner.png" alt="banner"/>
        </div>
      </div>
    </div>
  )
}