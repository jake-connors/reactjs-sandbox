import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarItem from "../components/navbar/NavbarItem";
import Location from "../components/navbar/Location";
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
        { title: "All Examples", subpath: "/js_examples", display_order: 1 },
        { title: "Typeahead & Table", subpath: "/js_examples/typeahead_table", display_order: 2 },
        { title: "Drag & Drop", subpath: "/js_examples/drag_drop", display_order: 3 },
        { title: "Poppers", subpath: "/js_examples/popper", display_order: 4 }
    ];
    const phpChildren = [
        { title: "All Examples", subpath: "/php_examples", display_order: 1 },
        { title: "Email", subpath: "/php_examples/email", display_order: 2 },
        { title: "Excel", subpath: "/php_examples/excel", display_order: 3 }
    ];
    const pythonChildren = [
        { title: "All Examples", subpath: "/python", display_order: 1 },
        { title: "AI", subpath: "/python/ai", display_order: 2 }
    ];
    const navbarItems = [
        { title: "Javascript", subpath: "/js_examples", children: jsChildren },
        { title: "PHP", subpath: "/php_examples", children: phpChildren },
        { title: "Python", subpath: "/python_examples", children: pythonChildren },
        { title: "Other", subpath: "other", children: [] },
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
                        <Location />
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
                            subpath={item.subpath}
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