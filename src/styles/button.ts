import styled, { CSSObject } from 'styled-components';

const buttonBase: CSSObject = {
  borderRadius: '5px',
  transition: 'background 200ms linear',
  fontSize: '14px',
  minHeight: '30px',
  minWidth: '30px',
  border: 'none',
  color: '#505658',
  backgroundColor: '#e9ecec',
  '&:hover': {
    backgroundColor: '#cdd3d5'
  },
  '&:focus': {
    outline: 0
  },
  '& svg': {
    fill: '#505658',
    verticalAlign: 'middle',
    fontSize: '20px',
    '&:not(:only-child)': {
      marginLeft: '7px'
    }
  },
  '& a': {
    color: '#505658'
  },
  '& span': {
    paddingLeft: '3px',
    paddingRight: '3px',
    marginRight: '5px'
  }
};

const TalkyButton = styled.button(buttonBase);

export { buttonBase, TalkyButton };
