import { Popper, styled } from '@mui/material';

const StyledPopper = styled(Popper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#f7f7f7',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  paddingLeft: '10px',
  paddingRight: '10px',
  boxShadow: `0 4px 2px -2px ${theme.palette.mode === 'dark' ? '#312f2f' : '#e6e6e6'}`,
}));

export { StyledPopper };
