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

export function getRowNamesArray(section: Record<string, any>) {
  return new Set(section.map((obj: Seat) => obj.row));
}

export function getSections(seats: Seat[]) {
  const sectionNames = [...new Set(seatData.map((obj) => obj.section))];
  const sections: Record<string, Seat[]> = {};

  sectionNames.forEach((sectionName) => {
    sections[sectionName as keyof typeof sections] = seats.filter((seat) => {
      return seat.section === sectionName;
    });
  });

  return sections;
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
      const rowNames = [...getRowNamesArray(section)];
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

function getRowLengthObject(seats: Seat[]) {
  const sections = getSections(seats);
  const rowLengthObject: Record<string, Record<string, number>> = {};

  (Object as any)
    .entries(sections)
    .forEach(
      ([sectionName, section]: [
        keyof typeof sections,
        Record<string, any>,
      ]) => {
        rowLengthObject[sectionName] = {};
        const rowNames = [...new Set(section.map((obj: Seat) => obj.row))];
        rowNames.forEach((rowName) => {
          rowLengthObject[sectionName][rowName as keyof typeof sections] = [
            ...section.filter((obj: Seat) => obj.row === rowName),
          ].length;
        });
      },
    );

  return rowLengthObject;
}

function getBestSeatsInEveryRow(seats: Seat[], seatNumber: number) {
  const rowLengthObject = getRowLengthObject(seats);
  const allOptionsInEveryRow = getAllOptionsInEveryRow(seats, seatNumber);

  const bestSeatsInEveryRow: Array<Seat[]> = [];

  allOptionsInEveryRow.forEach((row) => {
    const section = row[0][0].section;
    const rowName = row[0][0].row;
    const rowLength = rowLengthObject[section][rowName];

    const startPoint = Math.floor((rowLength - seatNumber) / 2);

    let bestSeatsInARow: Seat[] = [];
    let index = startPoint;

    for (let i = 0; i < rowLength; i++) {
      index += i % 2 === 1 ? i : -i;

      const bestOption = row.filter(
        (option) => option[0].seatNumber === index + 1,
      );

      if (bestOption.length > 0) {
        bestSeatsInARow = bestOption[0];
        break;
      }

    }
    bestSeatsInEveryRow.push(bestSeatsInARow);
  });

  return bestSeatsInEveryRow;
}

export function getBestSeats(seats: Seat[], seatNumber: number) {
  const bestSeatsInEveryRow = getBestSeatsInEveryRow(seats, seatNumber);

  let bestSeats: Seat[] = [];
  bestSeatsInEveryRow.forEach((row) => {
    if (bestSeats.length === 0) {
      bestSeats = row;
      return;
    }

    const sumOfTiersInRow = row.reduce((accumulator, object) => {
      return accumulator + object.tier;
    }, 0);
    const sumOfTiersInBestSeatArray = bestSeats.reduce(
      (accumulator, object) => {
        return accumulator + object.tier;
      },
      0,
    );

    if (sumOfTiersInRow < sumOfTiersInBestSeatArray) {
      bestSeats = row;
    }
  });

  return bestSeats;
}
