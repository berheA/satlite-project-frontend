import { Sat } from "./sat";
import { User } from "./user";

export class Comment {
    constructor(
        public description:string,
        public user:User,
        public sat:Sat,
        public date:string
    ){}
}
