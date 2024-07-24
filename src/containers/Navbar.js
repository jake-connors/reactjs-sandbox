import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarItem from "../components/navbar/NavbarItem";
import SearchBar from "../components/navbar/SearchBar";

function Navbar() {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setIsDesktop(true);
    }, []);

    const backendChildren = [
        { title: "Email", url: "/backend/email" },
        { title: "Excel", url: "/backend/excel" },
    ];
    const navbarItems = [
        { title: "Frontend", url: "frontend", children: [] },
        { title: "Backend", url: "", children: backendChildren },
        { title: "Other", url: "other", children: [] },
    ];

    return (
        <div className="navbar">
        {isDesktop && 
            <div className="container-fluid" id="navbar-desktop">
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

export default connect()(Navbar);