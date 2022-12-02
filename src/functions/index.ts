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
    .forEach(([sectionName, section]: [keyof typeof sections, Seat[]]) => {
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

function getAllOptionsInEveryRow(seats: Seat[], seatNumber: number) {
  const seatMap = getSeatMap(seats);

  const allOptionsInEveryRow: Array<Array<Seat[]>> = [];

  seatMap.forEach((row) => {
    const allOptionsInARow = [];

    for (let j = 0; j <= row.length - seatNumber; j++) {
      const arr2 = [];
      for (let k = 0; k < seatNumber; k++) {
        arr2.push(row[j + k]);
      }
      if (arr2.filter((obj) => obj.booked === true).length === 0) {
        allOptionsInARow.push(arr2);
      }
    }

    if (allOptionsInARow.length > 0) {
      allOptionsInEveryRow.push(allOptionsInARow);
    }
  });

  return allOptionsInEveryRow;
}

function getBestSeatsInEveryRow(seats: Seat[], seatNumber: number) {
  const allOptionsInEveryRow = getAllOptionsInEveryRow(seats, seatNumber);
  console.log(allOptionsInEveryRow);
  
}



export function bookSeats(seats: Seat[], seatNumber: number) {
  const bestSeatsInEveryRow = getBestSeatsInEveryRow(seats, seatNumber);
  console.log(bestSeatsInEveryRow);
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
