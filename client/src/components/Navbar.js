import React from 'react';
import {Link} from 'react-router-dom'
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Navbar = ({title}) =>{
    return (
        <ProSidebar >
            <SidebarHeader>
                <Menu>
                    <MenuItem><Link to='/'><h1>{title}</h1></Link></MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent>
                <div id={'navbar'}>
                <Menu iconShape="square">
                    <MenuItem><Link to='/login'>Login</Link></MenuItem>
                    <MenuItem><Link to='/editor'>Editor</Link></MenuItem>
                </Menu>
                </div>
            </SidebarContent>
            <SidebarFooter>
                <Menu>
                    <MenuItem>ComS 319 Group 30 </MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    )

}
Navbar.defaultProps={
    title:'VIPEr'
};
export default Navbar