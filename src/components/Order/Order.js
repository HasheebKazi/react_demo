import React from 'react';

// css
import classes from './Order.module.css';

const order = (props) => {

    let ingredients = []
    for (let ingredientName in props.ingredients) {
        ingredients.push(<span style={{textTransform: 'capitalize', display: 'inlike-block', margin: '0 8px', border: '1px solid grey', padding: '5px'}}> { ingredientName }: ({props.ingredients[ingredientName]}) </span>);
    }

    return (
        <div className={ classes.Order }>
            <div>Ingredients {ingredients}</div>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}  </strong></p>
        </div>
    );
}

export default order;