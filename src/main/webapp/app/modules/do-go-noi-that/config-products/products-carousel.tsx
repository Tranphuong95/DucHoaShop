// import React from 'react';
// import './resCarousel.css'

// export const ProductsCarousel = (props) => {
//   return (
//     <div>
//         <div className="container-fluid p0">
//           <div className="container">
//             <div className="resCarousel" data-items="4-4-0-0" data-slide={2} data-interval={1000} data-speed={1200} data-animator="lazy">
//               <div className="resCarousel-inner">
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/> {/*todo lay random san pham*/}
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//                 <div className="item">
//                   <div className="tile">
//                     <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                   </div>
//                 </div>
//               </div>
//               <button className="btn btn-default leftRs">&lt;</button>
//               <button className="btn btn-default rightRs">&gt;</button>
//             </div>
//           </div>
//           {/*home*/}
//         </div>
//         <hr />
//
//     </div>
//   );
// };


// import React from "react"
// import Slider from "react-slick";
//
// export const ProductsCarousel=()=>{
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };
//   return(
//     <Slider {...settings}>
//       <div className="container-fluid p0">
//         <div className="container">
//           <div className="resCarousel">
//             <div className="resCarousel-inner">
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/> {/*todo lay random san pham*/}
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//               <div className="item">
//                 <div className="tile">
//                   <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
//                 </div>
//               </div>
//             </div>
//             <button className="btn btn-default leftRs">&lt;</button>
//             <button className="btn btn-default rightRs">&gt;</button>
//           </div>
//         </div>
//         {/*home*/}
//       </div>
//       <hr />
//     </Slider>
//   )
// }


import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./configProducts.scss"

export const ProductsCarousel=()=> {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    return (
      <div className="container-fluid p0">
        <div className="container">
          <h2>Auto Play</h2>
          <Slider {...settings}>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
            <div>
              <div className="item">
                <div className="tile">
                  <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
}