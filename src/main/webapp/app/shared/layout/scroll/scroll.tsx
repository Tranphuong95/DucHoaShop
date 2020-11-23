import './scroll.scss'
import React, { useState } from 'react';

export const ScrollTop=(props)=>{
  const topFuction=()=>{
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
  }
  return(
    <div>
      <button  id="scroll-btn" onClick={topFuction} className="myBtn-block" title="Go to top">Top</button >

    </div>
  )
}
