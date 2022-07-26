import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import  axios  from "axios";

export const AutoPopAlbum = ({artist, selectedMaster, setSelectedMaster}) => {
  const [inputValue, setValue] = useState('');
  

  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedMaster(value);
  }

  // load options using API call
  const loadOptions = (inputValue) => {
    
    return axios.get(`https://api.discogs.com/database/search?q=${inputValue}&type=master&artist=${artist.title}&key=QOweiokWJRqHZcvyjksT&secret=dexKOwgmxPLTUVszUftstFAJHHOZvHHy`)
    .then(resultStuff);
}; //https://api.discogs.com/database/search?q=Sky&type=release&artist=wilco&key=QOweiokWJRqHZcvyjksT&secret=dexKOwgmxPLTUVszUftstFAJHHOZvHHy

const resultStuff = (res) => {
    console.log(res)

   
    return res.data.results
}


  return (
    <div className="App">
    
      <pre>Select Album Name: {inputValue}</pre>
      <AsyncSelect
        // cacheOptions
        // defaultOptions
        value={selectedMaster}
        getOptionLabel={e => e.title}
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      {/* <pre>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre> */}
      <pre>Year Released: {JSON.stringify(selectedMaster?.year ||{ }, null, 2)}</pre>
      <img alt= "Artwork Unavailable" src={`${selectedMaster?.cover_image}`} /> 
      {/* {JSON.stringify(selectedValue?.cover_image ||{ }, null, 2)} */}
      
    </div>
    
  );
}

