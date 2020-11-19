import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWhatsapp, faWeixin, faFacebookSquare} from '@fortawesome/free-brands-svg-icons'
import {faCommentDots}from "@fortawesome/free-regular-svg-icons"
import {faUserCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
export const ChatZalo=(props)=>{
  return(
    <div className="social-button d-none d-sm-block d-md-block d-lg-block d-xl-block">
      <div className="social-button-content">
        <a href="tel:0981481368" className="call-icon" rel="nofollow">
          <FontAwesomeIcon icon={faWhatsapp} size="3x"/>
          {/*<div className="animated alo-circle" />*/}
          {/*<div className="animated alo-circle-fill  " />*/}
          <span>Hotline: 098 148 1368</span>
        </a>
        <a href="sms:0981481368" className="sms">
          <FontAwesomeIcon icon={faWeixin} size="3x"/>
          <span>SMS: 098 148 1368</span>
        </a>
        <a href="https://www.facebook.com/Ngocthang.net/" className="mes">
          <FontAwesomeIcon icon={faFacebookSquare} size="3x"/>
          <span>Nhắn tin Facebook</span>
        </a>
        <a href="http://zalo.me/0981481368" className="zalo">
          {/*<FontAwesomeIcon icon={faCommentDots} size="3x"/>*/}
          <img src="./../../../../content/images/zalo-icon.png"/>
          <span>Zalo: 098.148.1368</span>
        </a>
      </div>
      {/*<a className="user-support">*/}
      {/*  <FontAwesomeIcon icon={faUserCircle } size="3x"/>*/}
      {/*  <div className="animated alo-circle" />*/}
      {/*  <div className="animated alo-circle-fill" />*/}
      {/*</a>*/}
    </div>
  );
};
export default ChatZalo;