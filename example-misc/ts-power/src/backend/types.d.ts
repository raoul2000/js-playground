declare namespace TMD {
    interface Tag {
        name:string;
        level:number;
    }
    
    interface Document {
        file:string;
        tags:Array<Tag>;
    }
}