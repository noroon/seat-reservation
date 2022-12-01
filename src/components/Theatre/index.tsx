import { useContext } from 'react';

import ReloadButton from '../ReloadButton';
import Section from '../Section';
import TierInfo from '../TierInfo';
import { getSections } from '../../functions';
import { SeatContext } from './../../context/seatContext';
import './index.scss';

const Theatre = () => {
  const { seats } = useContext(SeatContext);
  const sections = getSections(seats);

  return (
    <div className="container d-flex flex-column align-items-center me-4 pt-4 pb-4">
      {(Object as any)
        .entries(sections)
        .map(
          ([sectionName, section]: [
            keyof typeof sections,
            Record<string, any>,
          ]) => (
            <Section sectionName={sectionName} section={section} />
          ),
        )}
      <TierInfo />
      <ReloadButton />
    </div>
  );
};

export default Theatre;
