import { Student } from "./student";

export interface Group {
    id: string,
    name: string,
    student: Student,
    year: string,
    rank: string,
    studentList: Student[];
    project: string;
}