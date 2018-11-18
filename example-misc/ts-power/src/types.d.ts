declare namespace TMD {
    interface Tag {
        name:string;
        index:number;
    }
    
    interface Document {
        file:string;
        tags:Array<Tag>;
    }
}