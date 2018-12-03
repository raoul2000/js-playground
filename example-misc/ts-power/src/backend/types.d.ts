declare namespace TMD {

    // Store /////////////////////////////////////////////////////////

    interface Store {
        getTagStore() : TagStore;
        getDocumentStore() : DocumentStore;
        getAllTags() : Promise<Array<TagProperties>>;
        addTag(tag:Tag): Promise<any>;
        getAllDocuments() : Promise<Array<Document>>;
        addDocument(document:Document): Promise<Document>;
    }

    // Tag ///////////////////////////////////////////////////////////

    interface TagProperties {
        name?:string;
        level?:number;
    }

    interface Tag {
        getName():string;
        getLevel():number;
        properties():any;
        clone(o?:any): Tag;
    }

    interface TagStore {
        getAll() : Promise<Array<TagProperties>>;
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
}