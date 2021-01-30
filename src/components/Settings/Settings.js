/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {useActions, useNationality} from '../../features/settings';
import {Link} from 'react-router-dom';
import './Settings.scss';
import ArrowLeft from '../Icons/ArrowLeft/ArrowLeft';

export default function Settings() {
  const {setNationality} = useActions();
  const nationality = useNationality();
  function handleNationalityChange(e) {
    setNationality(e.target.value);
  }
  return (
    <div className="settings-page">
      <header className="settings-header">
        <Link to="/" className="link" aria-label="go to home">
          <ArrowLeft/>
        </Link>
        <h2>Settings</h2>
      </header>
      <div className="settings-grid-container">
        <div className="labels">
          <label className="setting-labels" htmlFor="language-select">
            <p>Nationality:</p>
          </label>
        </div>
        <div className="fields">
          <select
            name="languages"
            className="select"
            id="language-select"
            value={nationality}
            onChange={handleNationalityChange}>
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
