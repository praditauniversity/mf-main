import React from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = React.useState(initialValue);

  const toggleValue = () => {
    setValue(prevValue => !prevValue);
  };

  return [value, toggleValue];
};

export default useToggle;