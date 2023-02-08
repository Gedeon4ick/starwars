import React from 'react';
import styles from './Menu.module.scss'

const Menu = () => {
  return (
    <div className={styles.menu}>
      <ul>
        <li>Characters</li>
        <li>Planets</li>
        <li>Starships</li>
        <li>Vehicles</li>
      </ul>
    </div>
  );
};

export default Menu;