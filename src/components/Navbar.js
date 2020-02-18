import React from 'react'
import { Link } from 'gatsby'
import Search from '../img/search.inline.svg'
import logo from '../../static/img/logo_MEN.png'

// TODO add tags to Navbar
const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  handleSearchInput(event) {
    if (event.key === 'Enter') {
      // search
    }
    console.log({event}, event.target.value, event.key);
  }

  render() {
    return (
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Home">
              <img src={logo} alt="MEN logo" />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <Link className="navbar-item" to="/blog">
                Alle artikelen
              </Link>
              <Link className="navbar-item" to="/tags">
                Categorieën
              </Link>
              <Link className="navbar-item" to="/about">
                Over de European
              </Link>
            </div>
            <div className="navbar-end control has-icons-right">
              <input type="search" className="input" placeholder="Zoeken" onKeyUp={this.handleSearchInput.bind(this)}/>
              <span className="icon is-right">
                <Search title="zoek-icoon" id="search-input"></Search>
              </span>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
