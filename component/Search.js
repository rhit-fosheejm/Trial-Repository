// // Imports
// import React, { Component } from 'react';

// // Import Search Bar Components
// import SearchBar from 'material-ui-search-bar';

// // Import React Scrit Libraray to load Google object
// import Script from 'react-load-script';


// class Search extends Component {
//   // Define Constructor
//   constructor(props) {
//     super(props);

//     // Declare State
//     this.state = {
//       city: '',
//       query: ''
//     };

//   }

//   handleScriptLoad = () => {
//     // Declare Options For Autocomplete
//     const options = {
//       types: ['(cities)'],
//     };

//     // Initialize Google Autocomplete
//     /*global google*/ // To disable any eslint 'google not defined' errors
//     this.autocomplete = new google.maps.places.Autocomplete(
//       document.getElementById('autocomplete'),
//       options,
//     );

//     // Avoid paying for data that you don't need by restricting the set of
//     // place fields that are returned to just the address components and formatted
//     // address.
//     this.autocomplete.setFields(['address_components', 'formatted_address']);

//     // Fire Event when a suggested name is selected
//     this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
//   }
  
//   handlePlaceSelect = () => {

//     // Extract City From Address Object
//     const addressObject = this.autocomplete.getPlace();
//     const address = addressObject.address_components;

//     // Check if address is valid
//     if (address) {
//       // Set State
//       this.setState(
//         {
//           city: address[0].long_name,
//           query: addressObject.formatted_address,
//         }
//       );
//     }
//   }

//   render() {
//     return (
//       <div>
//         <Script
//           url="https://maps.googleapis.com/maps/api/js?key=your_api_key&libraries=places"
//           onLoad={this.handleScriptLoad}
//         />
//         <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
//           style={{
//             margin: '0 auto',
//             maxWidth: 800,
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default Search;

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function Search() {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwRp1e12ec1vOTtGiA4fcCt2sCUS78UYc&libraries=places',
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      style={{ width: 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" variant="outlined" fullWidth />
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}