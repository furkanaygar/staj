import React, { useState, useEffect } from 'react';
import getUser from '../services/getUser';
import Parser from 'html-react-parser';

function Get() {
  const [data, setUserData] = useState('');

  useEffect(() => {
    getUser().then(response => {
      setUserData(
        ' <div> Username: ' +
          response.username +
          '</br>Birth Date: ' +
          response.dateBirth +
          '</br>Identification No: ' +
          response.identificationNo +
          '</div>'
      );
    });
  }, []);
  return (
    <div>
      <div>{Parser(data)}</div>
    </div>
  );
}

export default Get;
