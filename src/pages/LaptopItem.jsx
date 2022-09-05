import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../utils';
import BackBtn from '../components/UI/BackBtn/BackBtn';
import LaptopOwner from '../components/Laptop/LaptopOwner';
import placeholderImg from '../images/placeholder.webp';
import LaptopProperties from '../components/Laptop/LaptopProperties';
import LaptopCpu from '../components/Laptop/LaptopCpu';
import LaptopPurchase from '../components/Laptop/LaptopPurchase';
import LaptopPurchaseDate from '../components/Laptop/LaptopPurchaseDate';
import { useContext } from 'react';
import { ServerErrorContext } from '../context';

const LaptopItem = () => {
  const { setErrorText, setServerError } = useContext(ServerErrorContext);
  // laptop id used to fetch laptop data
  const laptopId = useParams().id;

  // empty laptop opbject
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
      cpu: { cores: '', threads: '', name: '' },
      price: ''
    }
  });

  // fetching laptop data and parsing it to laptop object
  useEffect(() => {
    getData(
      `https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=${process.env.REACT_APP_TOKEN}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((res) => setLaptop(res.data));
      } else {
        setServerError(true);
        setErrorText(res.statusText);
      }
    });
  }, []);

  document.querySelector('body').style.overflow = 'auto';
  document.querySelector('html').style.overflow = 'auto';

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
