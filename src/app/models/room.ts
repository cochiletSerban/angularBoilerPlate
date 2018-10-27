export interface Room {
    id: number;
    capacity: number;
    name: string;
    type: string; // VIDEO, ENTERPRISE, SCRUM
    floor: number;
}
