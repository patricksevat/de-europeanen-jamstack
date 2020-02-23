import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
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
    // flatten, transf to lowercase and filter falsy tags
    const tags = this.props.data.allMarkdownRemark.nodes.flatMap( node => {
      const nodeTags = node?.frontmatter?.tags || [];
      return nodeTags.reduce((aggr, tag) => {
        if (!tag) {
          return aggr;
        }

        aggr.push(tag.toLowerCase());
        return aggr;
      }, [])
    }, []);
    // dedupe and sort alphabetically
    const uniqueTags = Array.from(new Set(tags)).sort();

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
              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/tags" className="navbar-link">
                  Categorieën
                </Link>
                <div className="navbar-dropdown is-boxed">
                  { uniqueTags.map(tag => (
                    <Link key={tag} to={`/tags/${tag}`} className="navbar-item">
                      { tag }
                    </Link>
                  ))}
                </div>
              </div>
              <Link className="navbar-item" to="/about">
                Over de Europeanen
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

export default props => (
  <StaticQuery
    query={graphql`
      query tagQuery {
        allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "blog-post"}}}) {
          nodes {
            frontmatter {
              tags
            }
          }
        }
      }
    `}
    render={data => <Navbar data={data} {...props}></Navbar>}
  >

  </StaticQuery>
)
