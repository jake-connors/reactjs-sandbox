import { connect } from "react-redux";
import { useState, useEffect } from "react";
import NavbarItem from "../components/navbar/NavbarItem";
import SearchBar from "../components/navbar/SearchBar";

function Navbar() {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setIsDesktop(true);
    }, []);

    const frontendChildren = [
        { title: "Popper", url: "popper" },
        { title: "Popup Notify", url: "popup_notify" },
        { title: "Drag & Drop", url: "drag_and_drop" },
    ];
    const backendChildren = [
        { title: "Email", url: "email" },
        { title: "Excel", url: "excel" },
    ];
    
    const navbarItems = [
        { title: "Frontend", url: "", children: frontendChildren },
        { title: "Backend", url: "", children: backendChildren },
        { title: "Other", url: "", children: [] },
    ];

    return (
        <>
        {isDesktop && 
            <div className="container-fluid" id="navbar-desktop">
                <div className="row" id="navbar-upper">
                    <div className="col-sm-2">
                        <a
                            href="/home"
                            title="Click to view Home"
                            id="logo-anchor"
                        >
                            <img src="/assets/logo.svg" />
                        </a>
                    </div>
                    <div className="col-sm-8">
                        <SearchBar />
                    </div>
                    <div className="col-sm-2" id="navbar-extras">
                        <a href="/about">About</a>
                        <a href="/documentation">Documentation</a>
                        <a href="/settings">Settings</a>
                        <a href="/contact">Contact</a>
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
        </>
    );
}

export default connect()(Navbar);