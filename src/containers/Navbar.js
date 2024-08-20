import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarItem from "../components/navbar/NavbarItem";
import SearchBar from "../components/navbar/SearchBar";
import MobileMenu from "../components/navbar/MobileMenu";
import StylePicker from "../components/navbar/StylePicker";

function Navbar({ user_info }) {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(updateMedia, []);

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    function updateMedia() {
        const desktopMinSize = 991;
        setIsDesktop(window.innerWidth > desktopMinSize);
    }

    const jsChildren = [
        { title: "Typeahead & Table", subpath: "/js_examples/typeahead_table", display_order: 1 },
        { title: "Drag & Drop", subpath: "/js_examples/drag_drop", display_order: 2 },
        { title: "Poppers", subpath: "js_examples/popper", display_order: 3 }
    ];
    const phpChildren = [
        { title: "Email", url: "/php_examples/email", display_order: 1 },
        { title: "Excel", url: "/php_examples/excel", display_order: 1 }
    ];
    const pythonChildren = [
        { title: "AI", url: "/python/ai", display_order: 1 }
    ];
    const navbarItems = [
        { title: "Javascript", url: "", children: jsChildren },
        { title: "PHP", url: "", children: phpChildren },
        { title: "Python", url: "", children: pythonChildren },
        { title: "Other", url: "other", children: [] },
    ];

    return (
        <div id="navbar-all" className={user_info.site_style}>
        {isDesktop && (
            <div id="navbar-desktop" className="container-fluid">
                <div className="row" id="navbar-upper">
                    <div className="col-sm-2">
                        <Link
                            to="/"
                            title="Click to view Home"
                            id="logo-link"
                        >
                            <img src="/assets/logo.svg" />
                        </Link>
                    </div>
                    <div className="col-sm-8">
                        <SearchBar />
                    </div>
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
                </div>
                <div className="row" id="navbar-lower">
                    {navbarItems.map((item, i) => (
                        <NavbarItem 
                            key={i}
                            title={item.title}
                            url={item.url}
                            children={item.children}
                        />
                    ))}
                    <StylePicker isDesktop={isDesktop} />
                </div>
            </div>
        )}
        {!isDesktop && (
            <div id="navbar-mobile" className="container-fluid">
                <div className="row">
                    <div className="col-xs-8">
                        <Link
                            to="/"
                            title="Click to view Home"
                            id="logo-link-mobile"
                        >
                            <img 
                                src="/assets/logo.svg" 
                                alt="IMG NOT FOUND" 
                                viewBox="0 0 134 36"
                                preserveAspectRatio="xMinYMin meet"
                            />
                        </Link>
                    </div>
                    <div className="col-xs-4">
                        <MobileMenu 
                            menuItems={navbarItems}
                            isDesktop={isDesktop}
                        />
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
} 

export default connect(mapStateToProps)(Navbar);