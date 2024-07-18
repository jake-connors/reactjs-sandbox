import { Link } from "react-router-dom";
import { useRef } from "react";
import PopperHelper from "../PopperHelper";

function NavbarItem({ title, url, children }) {
    const ref = useRef(null);

    return (
        <>
        {
            children.length ?
                <>
                    <PopperHelper
                        ref={ref}
                        popperPlacement="bottom-start"
                        portalId="navbar-popper"
                        popperClassName="navbar-item-child"
                        referenceElement={
                            <div className="dropdown">
                                <span className="dropdown-toggle-groupie">
                                    {title}
                                    <span className="fa fa-chevron-down"></span>
                                </span>
                            </div>
                        }
                    >
                        <ul>
                            {children.map((child, i) => (
                                <li key={i}>
                                    <Link to={child.url} onClick={() => ref.current.close()}>
                                        {child.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </PopperHelper>
                </>
            :
            <Link className="navbar-item-nochild" to={url}>
                {title}
            </Link>
        }
        </>
    );
}

export default NavbarItem;