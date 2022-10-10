import Link from 'next/link'
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { wrapper } from '../redux/store';
import { useAppDispatch } from '../redux/hooks';
import { fetchBreweries } from '../redux/breweryReducer';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const dispatch = useAppDispatch();
  dispatch(fetchBreweries());
  return (
    <div>
      <h1>Brewery React 🍻</h1>
      <p>
        <Link href="/breweries">
          <a>Show breweries</a>
        </Link>
      </p>
    </div>
  );
}

export default wrapper.withRedux(IndexPage)
