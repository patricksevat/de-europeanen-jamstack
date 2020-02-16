import React from 'react'
import { Link } from 'gatsby'

// import facebook from '../img/social/facebook.svg'
// import twitter from '../img/social/twitter.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-text-white columns is-gapless is-centered">
        <div className="container column is-4">
          <div className="level">
            <Link to="/contact" className="level-item">
              <button className="button is-outlined is-white">
                Contact
              </button>
            </Link>
            <Link to="/admin" className="level-item">
              <button className="button is-outlined is-white">
                Login
              </button>
            </Link>
          </div>
          <p className="is-size-7 has-text-centered">
            (c) Maatschappelijk Europa Netwerk {new Date().getFullYear()}. Website door Webbureau Cr-8
          </p>
        </div>

      </footer>
    )
  }
}

export default Footer
