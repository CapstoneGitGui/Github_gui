import React from 'react';
import BarChart from './BarChart';
import CommitsPerWeek from './CommitsPerWeek';
import CommitsPerPerson from './CommitsPerPerson';

const Charts = () => {
  return (
    <div>
      <BarChart />
      <CommitsPerPerson />
    </div>
  );
};

export default Charts;
