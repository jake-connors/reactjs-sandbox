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
                                    <a href={child.url}>
                                        {child.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </PopperHelper>
                </>
            :
            <a className="navbar-item-nochild" href={url}>
                {title}
            </a>
        }
        </>
    );
}

export default NavbarItem;