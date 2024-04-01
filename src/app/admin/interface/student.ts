import { Result } from './result';
import { User } from './user';

export interface Student {
  name: string;
  studentId: string;
  rollNumber: number;
  year: Date;
  phone: string;
  user: User;
  resultList: Result[];
}
