/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react';
import {useActions, useNationality} from '../../features/settings';
import Link from '../Link';
import ArrowLeft from '../Icons/ArrowLeft/ArrowLeft';
import styles from './Settings.module.scss';

export default function Settings() {
  const {setNationality} = useActions();
  const nationality = useNationality();
  function handleNationalityChange(e: React.FormEvent<HTMLSelectElement>) {
    setNationality((e.target as HTMLInputElement).value);
  }
  return (
    <div className={styles['settings-page']}>
      <header className={styles['settings-header']}>
        <Link to="/" aria-label="go to home">
          <ArrowLeft/>
        </Link>
        <h2>Settings</h2>
      </header>
      <div className={styles['settings-grid']}>
        <div className={styles.labels}>
          <label className={styles['setting-labels']} htmlFor="language-select">
            <p>Nationality:</p>
          </label>
        </div>
        <div className={styles.fields}>
          <select
            name="languages"
            className={styles.select}
            id="language-select"
            value={nationality}
            onChange={handleNationalityChange}
          >
            <option value="ch">Swiss</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="gb">British</option>
          </select>
        </div>
      </div>
    </div>
  );
}
