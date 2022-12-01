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

export function bookSeats(seats: Seat[], seatNumber: number) {
  return seats;
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
