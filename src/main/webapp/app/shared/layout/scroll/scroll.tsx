import './scroll.scss'
import React, { useState } from 'react';

export const ScrollTop=(props)=>{
  const [scrollTop, setScrollTop]=useState(0);
  window.onscroll=()=>{
    setScrollTop(document.documentElement.scrollTop || document.body.scrollTop);
  }
  const scrollTopFuction=(event)=>{ //todo cần sửa lại
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
  }
  return(
    <div>
      <button  onClick={scrollTopFuction} className={scrollTop>20?"myBtn-block":"myBtn-hidden"} title="Go to top">Top</button>
    </div>
  )
}