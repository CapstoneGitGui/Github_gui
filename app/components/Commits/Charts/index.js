import React from 'react';
import BarChart from './BarChart';
import CommitsPerWeek from './CommitsPerWeek';
import CommitsPerPerson from './CommitsPerPerson';
import CommitsOverYear from './CommitsOverYear';

const Charts = () => {
  return (
    <div>
      <BarChart />
      <CommitsPerPerson />
      <CommitsOverYear />
    </div>
  );
};

// asgda

export default Charts;
