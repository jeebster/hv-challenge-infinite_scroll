import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import HomeListItem from './HomeListItem';

const PER_PAGE = 10;

const fetchHomes = (page, perPage, setHomes, setNextPage, setHasError, setHasMore) => {
  fetch(`http://app-homevision-staging.herokuapp.com/api_project/houses?page=${encodeURIComponent(page)}&per_page=${encodeURIComponent(perPage)}`)
    .then(res => res.json())
    .then(data => {
      // there does not appear to be page cursor header or body data so let's only continue if API response is not empty
      if (data.houses.length > 0) {
        setHomes(prevState => [...prevState, data.houses]);
        setNextPage(prevState => prevState + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    })
    .catch(err => {
      setHasError(true);
    })
};

const loader = () => (
  <div className="loader">Loading...</div>
);

const HomeList = () => {
  const [homes, setHomes] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  let items = [];
  homes.map(home => {
    // data returned form API is in form { index: {} }, e.g. { 0: { id: 1, addres: ''}}
    // let's clean this up to make the child components easier to work with
    const props = Object.values(home)[0];
    return items.push(
      <HomeListItem key={props.id} {...props} />
    );
  });

  return (
    <div>
      <div className="homes-list" aria-label="homes-list">
        <InfiniteScroll
          pageStart={nextPage}
          loadMore={() => fetchHomes(nextPage, PER_PAGE, setHomes, setNextPage, setHasError, setHasMore)}
          hasMore={hasMore}
          loader={loader()}
        >
          {items}
        </InfiniteScroll>
      </div>
      { hasError &&
        <div className="error" aria-label="error-container">
          There was an error fetching homes data. Please click the button to try again
          <button onClick={() => fetchHomes(nextPage, PER_PAGE, setHomes, setNextPage, setHasError, setHasMore)}>
            Fetch Homes
          </button>
        </div>
      }
    </div>
  )
};

export default HomeList;