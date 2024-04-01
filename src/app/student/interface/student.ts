import { Group } from "./group";
import { Result } from "./result";
import { User } from "./user";

export interface Student {
    name: string;
    id: string;
    rollNumber: string;
    year: Date;
    phone: string;
    user: User;
    result_list: Result[];
    group: Group;
}