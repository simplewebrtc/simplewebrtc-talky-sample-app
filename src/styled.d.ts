import 'styled-components';
import { Color } from './utils/colorify';
import { TalkyTheme } from './styles/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends TalkyTheme {}
}
