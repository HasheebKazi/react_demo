// core imports + libraries
import React from 'react';

// component imports
// import Aux from '../../HOC/Aux';

// css imports
import classes from './Layout.module.css';

const layout = (props) => {
    return (
        <React.Fragment>
            <div> Toolbar, Side Drawer, Backdrop </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default layout;