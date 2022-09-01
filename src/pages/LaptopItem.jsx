import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils';
import BackBtn from '../components/BackBtn';
import LaptopOwner from '../components/Laptop/LaptopOwner';
import placeholderImg from '../images/placeholder.webp';
import LaptopProperties from '../components/Laptop/LaptopProperties';
import LaptopCpu from '../components/Laptop/LaptopCpu';
import LaptopPurchase from '../components/Laptop/LaptopPurchase';
import LaptopPurchaseDate from '../components/Laptop/LaptopPurchaseDate';

const LaptopItem = () => {
  const laptopId = useParams().id;
  const [laptop, setLaptop] = useState({
    user: {
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      team_id: 0,
      position_id: 0
    },
    laptop: {
      image: '',
      brand_id: 0,
      hard_drive_type: '',
      name: '',
      ram: '',
      cpu: { cores: '', threads: '', name: '' }
    }
  });
  useEffect(() => {
    fetchData(
      `https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=ab09d65821320a72cc4969433abaaebf`
    ).then(setLaptop);
    fetchData('https://pcfy.redberryinternship.ge/api/');
  }, []);

  console.log(laptop.user);

  return (
    <div className="laptop">
      <BackBtn />
      <div className="container">
        <h1 className="laptop__title">{'ლეპტოპის ინფო'.toUpperCase()}</h1>
        <div className="laptop__stats">
          <img
            src={
              laptop.laptop.image
                ? `https://pcfy.redberryinternship.ge/${laptop.laptop.image}`
                : placeholderImg
            }
            alt="laptop"
            className="laptop__img"
          />
          <LaptopOwner stats={laptop.user} />
          <div className="laptop__stats-rowBorder"></div>
          <LaptopProperties stats={laptop.laptop} />
          <LaptopCpu stats={laptop.laptop.cpu} />
          <div className="laptop__stats-rowBorder"></div>
          <LaptopPurchase stats={laptop.laptop} />
          <LaptopPurchaseDate stat={laptop.laptop.purchase_date} />
        </div>
      </div>
    </div>
  );
};

export default LaptopItem;
