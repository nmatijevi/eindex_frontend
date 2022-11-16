export class Courses{
    id: number;
    name: string;
    studies: string;
    status: string;
    year: string;
    professor: string;

    constructor(id: number, name: string, studies: string, status: string, year: string, professor: string){
        this.id = id;
        this.name = name;
        this.studies = studies;
        this.status = status;
        this.year = year;
        this.professor = professor;
    }
}