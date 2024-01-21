import React from 'react';
import Stack from '@mui/material/Stack';
import Button  from '@mui/material/Button';

 const BaseButton: React.FC = () => {
  return (
    <Stack spacing={1} direction="row" >
      <Button sx={{backgroundColor:"black", borderRadius:"15px", width: "290px", height: "51px"}} variant="contained">Confirm & Contiune</Button>
    </Stack>
  );
}
export default BaseButton;