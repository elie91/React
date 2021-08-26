import React from 'react';
import {Link} from 'react-router-dom';

const ShippingPage = () => (
    <div>
        <div className="c-timeline">
            <div className="c-timeline__item activated ">
                <span>
                    <Link to='/checkout'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.8 9.2">
                            <path d="M3.9 9.2L0 5.4 1.4 4l2.2 2.2L8.2 0l1.6 1.2z"></path>
                        </svg>
                    </Link>

                </span>
                <p>Panier</p>
            </div>
            <div className="c-timeline__item current">
                <span>2 </span>
                <p>Livraison</p>
            </div>
            <div className="c-timeline__item">
                <span> 3 </span>
                <p>Paiement</p>
            </div>
            <div className="c-timeline__item">
                <span> 4 </span>
                <p>Confirmation</p>
            </div>
        </div>
    </div>
);

export default ShippingPage;