import GDILogo from '../assets/gdi-logo-blue.svg';
import './Header.css';

function Header({ setIsOpen }) {

    return (
        <header
            role="blanner"
            className="header flex-row z-20 w-full justify-between"
            ><div
                className="flex-row items-center justify-between pad-x-5 col-gap-3"
                ><a href="https://dtm.iom.int">
                    <img src={GDILogo} className="logo-container" />
                </a>
                <h1 className="header-title text-blue text-upper">
                    Anticipatory Action Dashboard
                </h1>
            </div>
            <div className="flex-row items-center pad-x-5 mgn-r-5 text-blue text-upper">
                <div className="link">
                    <span 
                        role="button"
                        tabIndex={0}
                        className="text-link"
                        onClick={() => setIsOpen(true)}
                        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
                    >Customise trigger
                    </span>
                </div>
                <div className="link">About</div>
            </div>
        </header>
    )
}

export default Header;