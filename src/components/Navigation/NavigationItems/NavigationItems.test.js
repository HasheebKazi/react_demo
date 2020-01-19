// create react app already includes Jtest
// enzyme allows us to render items stand alone
import React from 'react';
// react components
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// shallow component

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    it('should render two navigation item elemnts if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three navigation item elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    // it('should render a logout navigation item if authenticated', () => {
    //     wrapper.setProps({isAuthenticated: true})
    //     expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    // });

});