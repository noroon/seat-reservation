import { createContext, useMemo, useState } from 'react';
import { getReservedSeats } from '../functions';

export type Seat = {
  section: string;
  row: string;
  seatNumber: number;
  tier: number;
  booked: boolean;
};

interface Context {
  seats: Seat[];
  setSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
}

export const SeatContext = createContext<Context>({} as Context);

export function SeatProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [seats, setSeats] = useState([...getReservedSeats()]);
  const value = useMemo(() => ({ seats, setSeats }), [seats]);

  return <SeatContext.Provider value={value}>{children}</SeatContext.Provider>;
}
