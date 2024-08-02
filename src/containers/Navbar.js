import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarItem from "../components/navbar/NavbarItem";
import SearchBar from "../components/navbar/SearchBar";
import MobileMenu from "../components/navbar/MobileMenu";
import StylePicker from "../components/navbar/StylePicker";

function Navbar() {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(updateMedia, []);

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    function updateMedia() {
        const desktopMinSize = 991;
        // console.log('is desktop ? ', window.innerWidth > desktopMinSize);
        // console.log('window.innerWidth: ', window.innerWidth);
        // setIsDesktop(true);
        setIsDesktop(window.innerWidth > desktopMinSize);
    }

    // useEffect(() => {
    //     setIsDesktop(true);
    // }, []);

    const backendChildren = [
        { title: "Email", url: "/php_examples/email" },
        { title: "Excel", url: "/php_examples/excel" },
    ];
    const navbarItems = [
        { title: "Javascript", url: "js_examples", children: [] },
        { title: "PHP", url: "", children: backendChildren },
        { title: "Other", url: "other", children: [] },
    ];

    return (
        <div className="navbar-all">
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
                    <StylePicker isDesktop={isDesktop} />
                    <div className="col-xs-4">
                        <MobileMenu 
                            menuItems={navbarItems}
                        />
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default Navbar;