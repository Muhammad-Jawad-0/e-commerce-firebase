import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
    // navList Data
    const navList = (
        <ul className="flex !space-x-3 text-white font-medium text-md !px-5 !gap-x-5">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Signup */}
            <li>
                <Link to={'/signup'}>Signup</Link>
            </li>

            {/* User */}
            <li>
                <Link to={'/'}>Kamal</Link>
            </li>

            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                    Cart(0)
                </Link>
            </li>
        </ul>
    )
    return (
        <nav className="bg-pink-600 sticky top-0 !h-12 flex justify-center flex-col">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center !py-3 lg:!px-3 ">
                {/* left  */}
                <div className="left !py-3 lg:!py-0">
                    <Link to={'/'}>
                        <h2 className=" font-bold text-white text-2xl text-center">E-Bharat</h2>
                    </Link>
                </div>

                {/* right  */}
                <div className="right flex justify-center !mb-4 lg:!mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default Navbar;