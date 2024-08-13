import { useState } from "react";
import { Link } from "react-router-dom";
import { slide as Burger } from "react-burger-menu";
import SearchBar from "./SearchBar";
import StylePicker from "./StylePicker";


function MobileMenu({ menuItems, isDesktop }) {
    
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    
    const styles = {
        bmMenuWrap: {
            transition: "all 0.25s ease 0s",
        },
    };
    
    function handleCloseMenu() {
        setMenuIsOpen(false);
    }

    function onStateChange(state) {
        console.log('on state change, state : ', state);
        setMenuIsOpen(state.isOpen);
    }
    
    return (
        <div id="mobile-menu">
            <Burger right width={"100%"} 
                styles={styles}
                isOpen={menuIsOpen}
                onStateChange={onStateChange}
            >
                <SearchBar />
                <div className="clear10" />
                {menuItems.map((item, i) => (
                    <span key={i} className="navbar-section">
                        {item.children.length ? 
                            <>
                                <span className="navbar-item-label">{item.title}</span>
                                {item.children.map((child, ii) => (
                                    <Link key={ii} to={child.url} className="navbar-item-child" onClick={handleCloseMenu}>{child.title}</Link>
                                ))}
                            </>
                        :
                        <Link to={item.url} className="navbar-item-nochild" onClick={handleCloseMenu}>
                            {item.title}
                        </Link>
                        }
                    </span>
                ))}
                <StylePicker isDesktop={isDesktop}/>
                <div className="col-sm-2" id="navbar-extras">
                    <Link to="/about" onClick={handleCloseMenu}>
                        <i className="fa fa-info-circle"></i>About
                    </Link>
                    <Link to="/contact" onClick={handleCloseMenu}>
                        <i className="fa fa-envelope"></i>Contact
                    </Link>
                    <br />
                    <Link to="/settings" onClick={handleCloseMenu}>
                        <i className="fa fa-cog"></i>Settings
                    </Link>
                    <Link to="/documentation" onClick={handleCloseMenu}>
                        <i className="fa fa-code"></i>Code
                    </Link>
                </div>
                <div className="clear20" />
                <div className="clear20" />
            </Burger>
        </div>
    );
}

export default MobileMenu;