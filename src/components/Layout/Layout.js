// core imports + libraries
import React from 'react';

// component imports
// import Aux from '../../HOC/Aux';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// css imports
import classes from './Layout.module.css';

const layout = (props) => {
    return (
        <React.Fragment>
            <ToolBar />
            <SideDrawer />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default layout;