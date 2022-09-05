import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ServerErrorContext } from '../../context';
import { getData } from '../../utils';
import LaptopOption from './UI/LaptopOption/LaptopOption';

const LaptopOwner = ({ stats }) => {
  const [formattedStats, setFormattedStats] = useState([]);
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);

  const { setErrorText, setServerError } = useContext(ServerErrorContext);

  // fetching teams and positions
  useEffect(() => {
    getData('https://pcfy.redberryinternship.ge/api/teams').then((res) => {
      if (res.ok) {
        res.json().then((res) => setTeams(res.data));
      } else {
        setServerError(true);
        setErrorText(res.statusText);
      }
    });

    getData('https://pcfy.redberryinternship.ge/api/positions').then((res) => {
      if (res.ok) {
        res.json().then((res) => setPositions(res.data));
      } else {
        setServerError(true);
        setErrorText(res.statusText);
      }
    });
  }, []);

  // waiting stats to fetch to format data
  useEffect(() => {
    let team = '';
    let position = '';
    let formattedPhone = '';

    // formatting phone number
    formattedPhone = `${stats.phone_number.substring(
      0,
      4
    )} ${stats.phone_number.substring(4, 7)} ${stats.phone_number.substring(
      7,
      9
    )} ${stats.phone_number.substring(9, 11)} ${stats.phone_number.substring(
      11
    )}`;

    // setting team name
    if (stats.team_id && teams.length) {
      const teamObj = teams.find((opt) => opt.id === stats.team_id);
      team = teamObj.name;
    }

    // setting position name
    if (stats.position_id && teams.length) {
      const positionObj = positions.find((opt) => opt.id === stats.position_id);
      position = positionObj.name;
    }

    // setting formatted data
    setFormattedStats([
      ['სახელი', `${stats.name} ${stats.surname}`],
      ['თიმი', team],
      ['პოზიცია', position],
      ['მეილი', stats.email],
      ['ტელ. ნომერი', formattedPhone]
    ]);
  }, [stats]);

  return (
    <div className="laptop__owner">
      {formattedStats.map((stat) => (
        <LaptopOption key={stat[0]} stat={stat} className="secondColumn" />
      ))}
    </div>
  );
};

export default LaptopOwner;
