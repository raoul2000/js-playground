declare namespace TMD {

    // Tag ////////////////////////////////////////////////////////
    
    interface Tag {
        name:string;
        level:number;
    }
    interface TagStore {
        getAll() : Promise<Array<Tag>>;
        addTag(tag:Tag): Promise<any>;
        getStoreImplementation(): any;
    }

    // Document ////////////////////////////////////////////////////////

    interface Document {
        file:string;
        readonly tags:Array<Tag>;
    }

    interface DocumentStore {
        getAll() : Promise<Array<Document>>;
        addDocument(document:Document): Promise<Document>;
        getStoreImplementation(): any;
    }

    // ////////////////////////////////////////////////////////

    interface TagSuggestion {
        /**
         * The string used to generate suggestions
         */
        input:string;
    }
    
    interface Store {
        tag:  TagStore;
        document: DocumentStore;
    }
}