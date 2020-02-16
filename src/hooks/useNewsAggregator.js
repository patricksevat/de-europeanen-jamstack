
import fastXmlParser from 'fast-xml-parser';

export function useNewsAggregator () {
  // fetch('https://www.europa-nu.nl/id/vifdkm1d06kk/atom_nieuws?ctx=vj6od8fnokmz')
  //   .then((response) => response.text())
  //   .then((text) => {
  //     const json = fastXmlParser.parse(text);
  //     console.log({json})
  //   });

  fetch('https://www.dagelijksestandaard.nl/category/europese-unie/feed/')
  .then((response) => response.text())
  .then((text) => {
    console.log({text});
    const json = fastXmlParser.parse(text);
    console.log({json})
  });

}
