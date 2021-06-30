import React from 'react';
import t2 from './t2.jpg';
import Image from 'react-image-resizer';
import './Get.css';

const Home = props => (
  <Image
    img
    src={t2}
    alt='cur'
    height={700}
    width={1400}
    style={{ alignSelf: 'center' }}
  />
);

export default Home;
