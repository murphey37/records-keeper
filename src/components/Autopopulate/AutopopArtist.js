import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import  axios  from "axios";

export const AutoPopArtists = ({setSelectedArtist, selectedArtist}) => {
  const [inputValue, setValue] = useState('');


  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedArtist(value);
  }

  // load options using API call
  const loadOptions = (inputValue) => {
    
    return axios.get(`https://api.discogs.com/database/search?q=${inputValue}&type=artist&key=QOweiokWJRqHZcvyjksT&secret=dexKOwgmxPLTUVszUftstFAJHHOZvHHy`)
    .then(resultStuff);
}; 

const resultStuff = (res) => {
    console.log(res)

   
    return res.data.results
}


  return (
    <div className="App">
    
      <pre>Select Artist Name{inputValue}</pre>
      <AsyncSelect
        // cacheOptions
        // defaultOptions
        value={selectedArtist}
        getOptionLabel={e => e.title}
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      {/* <pre>Selected Value: {JSON.stringify(selectedArtist || {}, null, 2)}</pre> */}
    </div>
  );
}

