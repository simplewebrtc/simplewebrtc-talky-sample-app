import React from 'react';
import { ThemeProvider } from 'styled-components';
import themes from '../styles/themes';

const Provider = ({ children }: { children: React.ReactElement }) => {
  // Disabled temporarily until we finalize dark mode colors.
  // const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
  //   ? themes.dark
  //   : themes.light;
  return <ThemeProvider theme={themes.light}>{children}</ThemeProvider>;
};

export default Provider;
