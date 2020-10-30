import React from 'react';
import LinkWrapper from '../../utils/LinkWrapper';


const Header = () => {
    return (
    <nav>
    <div className="nav-wrapper light-blue darken-3">
      
      <LinkWrapper to="/" className="brand-logo center p-3" activeStyle={{}}>MobCar</LinkWrapper>
      
      <ul className="right">
        
        <li><LinkWrapper to='/login'>Login</LinkWrapper></li>
        <li><LinkWrapper to='/editar/:id'></LinkWrapper></li>
      </ul>
    </div>
  </nav>
    );
}
export default Header;