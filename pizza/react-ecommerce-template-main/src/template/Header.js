import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom"; // Utilisation de useHistory pour la navigation
import { useCart } from "../panier/CartContext";
import { AuthContext } from "../template/AuthContext"; // Importer AuthContext

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const { cart } = useCart();
  const { isLoggedIn, logout } = useContext(AuthContext); // Utilisation du contexte
  const history = useHistory(); // Utilisation de useHistory pour la navigation
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout(); // Appel à la fonction de déconnexion du contexte
    history.push("/login"); // Rediriger vers la page de login
  };

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav() {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon icon={["fab", "bootstrap"]} className="ms-1" size="lg" />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? "open" : "")}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link" replace onClick={changeNav}>
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link" replace onClick={changeNav}>
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/aleatoire" className="nav-link" replace onClick={changeNav}>
                  Surprise Me 
                </Link>
              </li>
              {/* Afficher "Edit Profile" uniquement si l'utilisateur est connecté */}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link to="/profileedit" className="nav-link" replace onClick={changeNav}>
                    Edit Profile
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-decoration-none"
                    onClick={() => {
                      changeNav();
                      handleLogout();
                    }}
                  >
                    Déconnexion
                  </button>
                </li>
              )}
            </ul>

            {/* Bouton panier avec badge dynamique */}
            <Link to="/panier">
              <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                <span className="ms-3 badge rounded-pill bg-dark">{totalItems}</span>
              </button>
            </Link>

            {!isLoggedIn && (
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={["fas", "user-alt"]} />
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <Link to="/login" className="dropdown-item" onClick={changeNav}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="dropdown-item" onClick={changeNav}>
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">{totalItems}</span>
            </button>
            <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
