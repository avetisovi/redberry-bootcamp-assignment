import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utils';
import LaptopOption from '../UI/LaptopOption/LaptopOption';

const LaptopOwner = ({ stats }) => {
  const [formatedStats, setFormatedStats] = useState([]);
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);

  // fetching teams and positions
  useEffect(() => {
    fetchData('https://pcfy.redberryinternship.ge/api/teams').then(setTeams);
    fetchData('https://pcfy.redberryinternship.ge/api/positions').then(
      setPositions
    );
  }, []);

  // setting formated data
  useEffect(() => {
    let team = '';
    let position = '';
    let formatedPhone = '';

    formatedPhone = `${stats.phone_number.substring(
      0,
      4
    )} ${stats.phone_number.substring(4, 7)} ${stats.phone_number.substring(
      7,
      9
    )} ${stats.phone_number.substring(9, 11)} ${stats.phone_number.substring(
      11
    )}`;

    if (stats.team_id && teams.length) {
      const teamObj = teams.find((opt) => opt.id === stats.team_id);
      team = teamObj.name;
    }

    if (stats.position_id && teams.length) {
      const positionObj = positions.find((opt) => opt.id === stats.position_id);
      position = positionObj.name;
    }

    setFormatedStats([
      ['სახელი', `${stats.name} ${stats.surname}`],
      ['თიმი', team],
      ['პოზიცია', position],
      ['მეილი', stats.email],
      ['ტელ. ნომერი', formatedPhone]
    ]);
  }, [stats]);
  return (
    <div className="laptop__owner">
      {formatedStats.map((stat) => (
        <LaptopOption key={stat[0]} stat={stat} className="secondColumn" />
      ))}
    </div>
  );
};

export default LaptopOwner;
