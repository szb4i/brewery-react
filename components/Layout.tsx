import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Brewery, BreweryState } from '../interfaces';
import _ from 'lodash';
import { breweryClicked } from '../redux/breweryReducer';
import { useRouter } from 'next/router'
import { createFilterOptions } from "@material-ui/lab";

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const brewery = useAppSelector(state => state.brewery) as BreweryState;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onTagsChange = (event, value: Brewery | null) => {
    if (!_.isNull(value)) {
      dispatch(breweryClicked(value));
      router.push('/breweries/' + value.id);
    }
  }
  const filterOptions = createFilterOptions({
    limit: 5
  });
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/breweries">
            <a>All Breweries</a>
          </Link>{' '}
        </nav>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={brewery.breweries}
          key="id"
          getOptionLabel={option => (option as Brewery).name + ", " + (option as Brewery).street}
          onChange={onTagsChange}
          filterOptions={filterOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Brewery name, street" />}
        />
      </header>
      {children}
      <footer>
        <hr />
      </footer>
    </div>
  )
}

export default Layout
