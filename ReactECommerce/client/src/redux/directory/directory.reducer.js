
const INITIAL_STATE = {
    sections: [
        {
            title: 'chapeaux',
            imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
            id: 1,
            linkUrl: 'shop/chapeaux'
        },
        {
            title: 'vestes',
            imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
            id: 2,
            linkUrl: 'shop/vestes'
        },
        {
            title: 'chaussures',
            imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
            id: 3,
            linkUrl: 'shop/chaussures'
        },
        {
            title: 'femmes',
            imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
            size: 'large',
            id: 4,
            linkUrl: 'shop/femmes'
        },
        {
            title: 'hommes',
            imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
            size: 'large',
            id: 5,
            linkUrl: 'shop/hommes'
        }
    ]
}

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default directoryReducer;