import React from 'react';
import { PlaceholderGenerator } from '../types';

interface Context {
  gridPlaceholder: PlaceholderGenerator;
  haircheckHeaderPlaceholder: PlaceholderGenerator;
  emptyRosterPlaceholder: PlaceholderGenerator;
  homepagePlaceholder: PlaceholderGenerator;
}

const Placeholders = React.createContext<Context>({
  gridPlaceholder: null,
  haircheckHeaderPlaceholder: null,
  emptyRosterPlaceholder: null,
  homepagePlaceholder: null
});

export default Placeholders;
