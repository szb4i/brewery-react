// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type Brewery = {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  address_2: string;
  address_3: string;
  city: string;
  state: string;
  county_province: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  updated_at: string;
  created_at: string;
}
export type BreweryState = {
  breweries: Brewery[];
  clickedBrewery: Brewery | null;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export type BreweryObjectKey = keyof Brewery