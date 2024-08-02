import { Link } from "react-router-dom";
import { slide as Burger } from "react-burger-menu";
import SearchBar from "./SearchBar";
import { useEffect } from "react";

const styles = {
    bmMenuWrap: {
        transition: "all 0.25s ease 0s",
    },
};

function MobileMenu({ menuItems }) {

    useEffect(() => {
        console.log('use effect mobile menu . menuItems (navItems) : ', menuItems);
    }, []);

    return (
        <div id="mobile-menu">
            <Burger right width={"100%"} styles={styles}>
                <SearchBar />
                <div className="clear10" />
                {menuItems.map((item, i) => {
                    <React.Fragment key={i}>
                        {item.children.length ? 
                            <>
                                <span className="menu-item-label">{item.title}</span>
                                {item.children.map((child, ii) => {
                                    <Link key={ii} to={child.url} className="menu-item-child">{child.title}</Link>
                                })}
                            </>
                            
                        :
                        <Link className="navbar-item-nochild" to={item.url}>
                            {item.title}
                        </Link>
                        }
                    </React.Fragment>
                })}
                <div className="col-sm-2" id="navbar-extras">
                    <Link to="/about">
                        <i className="fa fa-info-circle"></i>About
                    </Link>
                    <Link to="/contact">
                        <i className="fa fa-envelope"></i>Contact
                    </Link>
                    <br />
                    <Link to="/settings">
                        <i className="fa fa-cog"></i>Settings
                    </Link>
                    <Link to="/documentation">
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