import { Lesson } from "./lesson";

export class Course{
    constructor(
        public id:number,
        public title:string,
        public description:string,
        public teacherId :number,
        public lessons:Lesson[]
    ){}
}