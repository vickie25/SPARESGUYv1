import React from 'react';
import { FaStar } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Header from '../Homepage/Header.jsx'
import Footer from '../Homepage/Footer.jsx';

const ProductDetail = () => {
  return (
    <>
    <Header/>
    <div className="container mt-4">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Shop</a></li>
          <li className="breadcrumb-item active" aria-current="page">Toyota Headlights</li>
        </ol>
      </nav>

      {/* Main Product Section */}
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
          <img src="path/to/headlight.jpg" alt="Toyota Headlight" className="img-fluid" />
        </div>
        {/* Product Info */}
        <div className="col-md-6">
          <h2>TOYOTA</h2>
          <p>Taillight Car LED system</p>
          <div className="d-flex align-items-center">
            <div className="rating">
              <FaStar color="#ffbf00" /> <FaStar color="#ffbf00" /> <FaStar color="#ffbf00" /> <FaStar color="#ffbf00" /> <FaStar color="#ffbf00" />
            </div>
            <span className="ml-2">(21 Reviews)</span>
          </div>
          <h4>$235.00</h4>
          <p>Enhance your driving visibility with our premium Car Headlight...</p>
          <p><strong>In Stock</strong></p>

          {/* Quantity and Add to Cart */}
          <div className="d-flex align-items-center mb-4">
            <button className="btn btn-outline-secondary">
              <AiOutlineMinus />
            </button>
            <span className="mx-2">1</span>
            <button className="btn btn-outline-secondary">
              <AiOutlinePlus />
            </button>
          </div>
          <button className="btn btn-dark">Add to Cart</button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-4">
        <ul className="nav nav-tabs" id="productTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab">Description</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="additional-info-tab" data-toggle="tab" href="#additional-info" role="tab">Additional Information</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab">Reviews</a>
          </li>
        </ul>
        <div className="tab-content" id="productTabContent">
          <div className="tab-pane fade show active" id="description" role="tabpanel">
            <p>Enhance your driving visibility with our premium Car Headlight...</p>
          </div>
          <div className="tab-pane fade" id="additional-info" role="tabpanel">
            {/* Additional Information */}
          </div>
          <div className="tab-pane fade" id="reviews" role="tabpanel">
            {/* Reviews Section */}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <h3>Related Products</h3>
        <div className="row">
          {['filter1.jpg', 'filter2.jpg', 'filter3.jpg', 'filter4.jpg'].map((item, index) => (
            <div key={index} className="col-md-3">
              <div className="card">
                <img src={`path/to/${item}`} alt="Related product" className="card-img-top" />
                <div className="card-body text-center">
                  <h5 className="card-title">Toyota Air filter</h5>
                  <p className="card-text"><strong>$235.00</strong></p>
                  <p className="card-text text-muted"><del>$295.00</del></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Features */}
      <div className="row mt-5 text-center">
        <div className="col-md-3">
          <img src="path/to/icon1.svg" alt="High Quality" />
          <p>High Quality<br />Crafted from top materials</p>
        </div>
        <div className="col-md-3">
          <img src="path/to/icon2.svg" alt="Warranty Protection" />
          <p>Warranty Protection<br />Over 2 years</p>
        </div>
        <div className="col-md-3">
          <img src="path/to/icon3.svg" alt="Free Shipping" />
          <p>Free Shipping<br />Order over $150</p>
        </div>
        <div className="col-md-3">
          <img src="path/to/icon4.svg" alt="24/7 Support" />
          <p>24/7 Support<br />Dedicated support</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default ProductDetail;
