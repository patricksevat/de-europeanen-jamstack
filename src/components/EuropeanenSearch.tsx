import React, { FunctionComponent, useState, useMemo } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Index } from "elasticlunr"

import Search from '../img/search.inline.svg'

import './europeanen-search.scss'

interface ISearchProps {
  index: any
}

const EuropeanenSearch: FunctionComponent<ISearchProps> = (props) => {
  const [ searchQuery, setSearchQuery ] = useState('');
  const index: Index = useMemo(() => Index.load(props.index), [props.index]);

  const results = index
    .search(searchQuery, { expand: true })
    .map(({ ref }) => index.documentStore.getDoc(ref));

  return (
    <div className="eu_search navbar-end control has-icons-right">
      <input
        type="search"
        className="input"
        placeholder="Zoeken"
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
      />
      <span className="icon is-right">
        <Search title="zoek-icoon" id="search-input"></Search>
      </span>
      { !!results.length && (
        <div className="eu_search-results panel">
          <p className="panel-heading">Zoekresultaten</p>
          { results.map(result => (
              <a
                href={result.path}
                className="panel-block"
              >{ result.title }</a>
          ))}
          </div>
      )}

    </div>
  )
};

export default props =>
  <StaticQuery
    render={data => <EuropeanenSearch {...props} index={data.siteSearchIndex.index}></EuropeanenSearch>}
    query={graphql`
        query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
  ></StaticQuery>;