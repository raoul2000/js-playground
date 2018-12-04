declare namespace TMD {

    // Store /////////////////////////////////////////////////////////

    interface Store {
        getTagStore() : TagStore;
        getAllTags() : Promise<Array<TagProperties>>;
        addTag(tag:Tag): Promise<any>;
        getTagByName(tagName:string): Tag;
        
        getDocumentStore() : DocumentStore;
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
        getTagByName(tagName:string): Tag;
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