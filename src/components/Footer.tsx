import { Box, Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Box textAlign='center' pt={4}>
      <Typography variant='body2' color='text.secondary'>
        Copyright ©{' '}
        <a
          href='https://github.com/bimarsha7'
          target='_blank'
          style={{ color: 'gray', cursor: 'pointer', textDecoration: 'underline' }}
          rel='noreferrer'
        >
          Bimarsha Bhandari
        </a>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}