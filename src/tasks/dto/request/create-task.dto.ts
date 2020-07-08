export class CreateTaskDTO {
     title: string;
}

export class ResTaskDTO {
    constructor(public title: string, public status: number, public message: string){
        this.title = title;
        this.status = status;
        this.message = message;
    }
    // title: string;
    // status: number;
    // message: string;
}