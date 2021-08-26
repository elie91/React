import React from 'react';
import CustomButton from "../custom-button/custom-button.component";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

const ItemPage = ({ location: { state: { item } } }) => {

    const dispatch = useDispatch();

    return (
        <div className="item_page">
            <div className="item_page__images">
                <img className="item_page__image" src={item.imageUrl} alt="item" />
                <img className="item_page__image" src={item.imageUrl} alt="item" />
                <img className="item_page__image" src={item.imageUrl} alt="item" />
                <img className="item_page__image" src={item.imageUrl} alt="item" />
            </div>
            <div className="item_page__infos">
                <h2 className="item_page__title">{item.name}</h2>
                <p>{item.price} €</p>
                <p className="item_page__description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda aut dolores
                    dolorum laudantium libero necessitatibus nesciunt, rem ullam voluptate. Dolore dolorum earum, esse hic
                    incidunt laudantium officia perspiciatis veritatis?
                </p>
                <CustomButton onClick={() => dispatch(addItem(item))}>
                    Ajouter au panier
                </CustomButton>
            </div>
        </div>
    )
}



export default ItemPage;