import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';


interface Props {
  children?: React.ReactNode;
}

export default function Fucktails(props: Props): JSX.Element {
  return (
    <div style={{background: 'red', borderRadius: '8px', border: '1px dashed blue'}}>
      {props.children}
    </div>
  );
}
