import React from 'react';
import './resCarousel.css'

export const ProductsCarousel = (props) => {
  return (
    <div>
        <div className="container-fluid p0">
          <div className="container">
            <div className="resCarousel" data-items="4-4-4-4" data-slide={2} data-interval={2000} data-speed={600} data-animator="lazy">
              <div className="resCarousel-inner">
                <div className="item">
                  <div className="tile">
                    <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/> {/*todo lay random san pham*/}
                  </div>
                </div>
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
                <div className="item">
                  <div className="tile">
                    <img src="./../../../../content/images/do_go_san_pham_1.png" alt='image product'/>
                  </div>
                </div>
              </div>
              <button className="btn btn-default leftRs">&lt;</button>
              <button className="btn btn-default rightRs">&gt;</button>
            </div>
          </div>
          {/*home*/}
        </div>
        <hr />

    </div>
  );
};