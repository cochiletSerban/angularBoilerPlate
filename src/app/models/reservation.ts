import { User } from './user';
import { Room } from './room';

export interface Reservation {
    id: number;
    date: string; // date: yyyy-MM-dd
    endTime: number;
    startTime: number;
    userData: User;
    roomData: Room;
}
