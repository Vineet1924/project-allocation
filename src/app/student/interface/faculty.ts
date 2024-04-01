import { User } from "./user";

export interface Faculty {
    id:string;
    name: string;
    experience: number;
    phone: string;
    user: User;
    technology_set: [];
    group_list: [];
}