import React from 'react';
import BarChart from './BarChart';
import CommitsPerWeek from './CommitsPerWeek';
import CommitsPerPerson from './CommitsPerPerson';
import CommitsOverYear from './CommitsOverYear';

const Charts = () => {
  return (
    <div className='padding-30'>
      <BarChart />
      <CommitsPerPerson />
      <CommitsOverYear />
    </div>
  );
};

// asgda

export default Charts;
