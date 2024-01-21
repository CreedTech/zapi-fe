import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

interface ZapiOption {
   value: string;
   label: string;
}

const ZapiOptions:ZapiOption[] =[
  { value:'Zapi API', label:'Zapi API' }
]

const animatedComponents = makeAnimated();

const SelectMulti:React.FC = () => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={ZapiOptions}
    />
  );
}

export default SelectMulti