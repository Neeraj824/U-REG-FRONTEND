import React from 'react';

const CurrencyBox = ({ code, rate }) => {
  return (
    <div className="currency-box">
      <div className="currency-name">{code}</div>
      <div className="currency-rate">{rate}</div>
    </div>
  );
};

export default CurrencyBox;
