import { useState, useEffect } from "react";
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
    
    useEffect(() => {
        console.log('use effect mobile menu . menuItems (navItems) : ', menuItems);
    }, []);

    function handleOpenMenu() {
        setMenuIsOpen(true);
    }

    function handleCloseMenu() {
        setMenuIsOpen(false);
    }
    
    
    return (
        <div id="mobile-menu">
            <Burger right width={"100%"} styles={styles} onOpen={handleOpenMenu} onClose={handleCloseMenu} isOpen={menuIsOpen}>
                <SearchBar />
                <div className="clear10" />
                {menuItems.map((item, i) => (
                    <React.Fragment key={i}>
                        {item.children.length ? 
                            <>
                                <span className="menu-item-label">{item.title}</span>
                                {item.children.map((child, ii) => (
                                    <Link key={ii} to={child.url} className="menu-item-child" onClick={handleCloseMenu}>{child.title}</Link>
                                ))}
                            </>
                        :
                        <Link className="navbar-item-nochild" to={item.url}>
                            {item.title}
                        </Link>
                        }
                    </React.Fragment>
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
                <div className="clear20" />
                <div className="clear20" />
            </Burger>
        </div>
    );
}

export default MobileMenu;