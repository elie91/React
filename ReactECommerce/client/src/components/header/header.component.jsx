import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/images/crown.svg';
import { Link } from 'react-router-dom';
import { signOutStart } from '../../redux/user/user.actions';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

const Header = () => {

    const currentUser = useSelector(selectCurrentUser);
    const hidden = useSelector(selectCartHidden);
    const dispatch = useDispatch();

    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="header__options">
                <Link className="header__option" to="/shop">
                    Boutique
                </Link>
                <Link className="header__option" to="/shop">
                    Contact
                </Link>
                {
                    currentUser ? (
                        <div className='header__option' onClick={() => dispatch(signOutStart())}>
                            Déconnexion
                        </div>
                    ) : (
                        <Link className="header__option" to="/signin">
                            Connexion
                        </Link>
                    )
                }
                <CartIcon />
            </div>
            {
                hidden ? null : (<CartDropdown />)
            }
        </div>
    )
}


export default Header;
