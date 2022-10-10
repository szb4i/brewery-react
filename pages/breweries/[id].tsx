import Layout from '../../components/Layout'
import { wrapper } from '../../redux/store'
import { useAppSelector } from '../../redux/hooks';
import { useRouter } from 'next/router';
import _ from 'lodash';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { BreweryObjectKey, BreweryState } from '../../interfaces';

const BreweryDetail = ({ item, errors }) => {
  const router = useRouter();
  const brewery = useAppSelector(state => state.brewery).clickedBrewery;
  const propertyNames = Object.keys(brewery).filter((x) => !_.isNull(brewery[(x as BreweryObjectKey)])) as BreweryObjectKey[];
  return (
      <Layout>
        <List>
            { propertyNames.map(property => 
                <ListItem disablePadding key={property}>
                    <ListItemButton>
                    <ListItemText primary={property} secondary={brewery[property]} />
                    </ListItemButton>
                </ListItem>
            )  }
        </List>
      </Layout>
  )
}


export default wrapper.withRedux(BreweryDetail)
