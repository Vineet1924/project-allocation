import { User } from './user';

export interface Faculty {
  name: string;
  experience: number;
  phone: string;
  user: any;
  technologiesSet: []; 
  domainSet: []; 
  groupList: []; 
}
