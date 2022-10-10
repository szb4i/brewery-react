import React from 'react'
import Layout from '../../components/Layout';
import { fetchBreweries, breweryClicked } from '../../redux/breweryReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { wrapper } from '../../redux/store';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import { Brewery, BreweryState } from '../../interfaces';

const BreweriesPage = () => {
  const brewery = useAppSelector(state => state.brewery);
  const dispatch = useAppDispatch();
  if ('pending' == brewery.status) {
    dispatch(fetchBreweries());
  }
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'brewery_type', headerName: 'Brewery Type', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'website_url', headerName: 'Website', width: 150 },
  ];
  const router = useRouter();
  const handleOnCellClick = (params: GridCellParams) => {
    const clickedBrewery = params.row as Brewery;
    dispatch(breweryClicked(clickedBrewery));
    router.push('/breweries/' + clickedBrewery.id);
  };
  return (
    <Layout title="About | Next.js + TypeScript Example">
      {['loading', 'pending'].includes(brewery.status) && <div>Loading...</div>}
      {'error' == brewery.status ? <div>Error: {brewery.error}</div> : null}
      {'success' == brewery.status && brewery.breweries.length ? (
        <div style={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={brewery.breweries}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onCellClick={handleOnCellClick}
          />
        </div>
      ) : null}
    </Layout>
  );
}

export default wrapper.withRedux(BreweriesPage)
