declare namespace TMD {
    interface TagSuggestion {
        /**
         * The string used to generate suggestions
         */
        input:string;
    }
    interface Tag {
        name:string;
        level:number;
    }
    
    interface Document {
        file:string;
        tags:Array<Tag>;
    }

    interface Store {
        tag:any;
        document:any;
    }
}