import _ from 'lodash';
import seatData from '../data.json';
import { Seat } from '../context/seatContext';

const getRandomNumber = (): number => {
  const seats = seatData.length;
  const minimum = Math.ceil(seats * 0.2);
  const maximum = seats;
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

function getRandomSeats() {
  const shuffled = [...seatData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, getRandomNumber());
}

export function getReservedSeats() {
  const reservedSeats = [...getRandomSeats()];

  const reservedAndFreeSeats = seatData.map((seat) => {
    const bookedSeat = reservedSeats.find((reservedSeat) => {
      return _.isEqual(seat, reservedSeat);
    });

    if (bookedSeat) {
      seat.booked = true;
    } else {
      seat.booked = false;
    }

    return seat;
  });

  return reservedAndFreeSeats;
}

function getSeatMap(seats: Seat[]) {
  const sections = getSections(seats);
  const seatMap: Array<Seat[]> = [];

  (Object as any)
    .entries(sections)
    .map(([sectionName, section]: [keyof typeof sections, Seat[]]) => {
      const rowNames = [...new Set(section.map((obj: Seat) => obj['row']))];
      rowNames.forEach((rowName) => {
        seatMap.push(
          seats.filter(
            ({ section, row }) => section === sectionName && row === rowName,
          ),
        );
      });
    });

  return seatMap;
}

export function bookSeats(seats: Seat[], seatNumber: number) {
  const seatMap = getSeatMap(seats);

  let bestSeatInARow: Seat[] = [];

  seatMap.map((row) => {
    const startPoint = Math.floor((row.length - seatNumber) / 2);
    let x = startPoint;
    for (let i = 0; i < row.length; i++) {
      x += i % 2 === 1 ? i : -i;

      if (!row[x].booked) {
        bestSeatInARow.push(row[x]);
        break;
      }
    }
    return;
  });

  console.log(bestSeatInARow);

  return;
}

export function getSections(seats: Seat[]) {
  const sectionNames = [...new Set(seatData.map((obj) => obj['section']))];
  const sections: Record<string, any> = {};

  sectionNames.forEach((sectionName) => {
    sections[sectionName as keyof typeof sections] = seats.filter((seat) => {
      return seat.section === sectionName;
    });
  });

  return sections;
}
