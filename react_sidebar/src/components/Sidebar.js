import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import './Sidebar.css';


// Hide/Show behaviour of sidebar
// Can also do inline styling instead of using const with: style={{left: sidebar ? '0' : '-100%'}}
const SidebarNav = styled.nav`
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
`;


const Sidebar = () => {

  // Set State for Sidebar
  const [sidebar, setSidebar] = useState(false);

  // Switch sidebar state when clicked
  const showSidebar = () => setSidebar(!sidebar);

  return (
    // Icon colors with IconContext.Provider
      <IconContext.Provider value={{ color: '#fff' }}> 
        <div className="Nav">
          <Link className="NavIcon" to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <SidebarNav className="SidebarNav" sidebar={sidebar}> 
          <div className="SidebarWrap">
            <Link className="NavIcon" to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </SidebarNav>
      </IconContext.Provider>
  );
};

export default Sidebar;