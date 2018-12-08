declare namespace TMD {

    // Store /////////////////////////////////////////////////////////

    interface Store {
        getTagStore() : TagStore;
        getAllTags() : Promise<Array<TagProperties>>;
        addTag(tag:Tag): Promise<any>;
        getTagById(tagId:string): Tag;
        
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
    }

    interface TagStore {
        getAll() : Promise<Array<TagProperties>>;
        addTag(tag:Tag): Promise<any>;
        getStoreImplementation(): any;
    }

    // Document ////////////////////////////////////////////////////////

    interface DocumentProperties {
        name?:string;
        tags?:Array<Tag>;
    }

    interface Document {
        getName():string;
        properties():any;
        getTags():Array<Tag>
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