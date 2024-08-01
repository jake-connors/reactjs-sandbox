import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarItem from "../components/navbar/NavbarItem";
import SearchBar from "../components/navbar/SearchBar";

function Navbar() {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(updateMedia, []);

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    function updateMedia() {
        // const desktopMinSize = 991;
        // console.log('is desktop ? ', window.innerWidth > desktopMinSize);
        // setIsDesktop(window.innerWidth > desktopMinSize);
        setIsDesktop(true);
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
        {isDesktop && 
            <div id="navbar-desktop" class="container-fluid">
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
                    <div className="col-sm-7">
                        <SearchBar />
                    </div>
                    <div className="col-sm-3" id="navbar-extras">
                        <Link to="/about">About</Link>
                        <Link to="/documentation">Documentation</Link>
                        <Link to="/settings">Settings</Link>
                        <Link to="/contact">Contact</Link>
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
                </div>
            </div>
        }
        </div>
    );
}

export default Navbar;