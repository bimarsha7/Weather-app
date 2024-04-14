import theme from '@/themes/theme';
import { ThemeProvider } from '@mui/material/styles';

export default function RootLayout(props: any) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </div>
  );
}
