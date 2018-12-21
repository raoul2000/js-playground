declare namespace TMD {

    // Store /////////////////////////////////////////////////////////

    interface Store {
        getTagStore() : TagStore;
        getAllTags() : Promise<Array<TagProperties>>;
        addTag(tag:Tag): Promise<any>;
        getTagById(tagId:string): Promise<Tag>;
        deleteTag(tagId:string): Promise<any>;
        
        getDocumentStore() : DocumentStore;
        getAllDocuments() : Promise<Array<Document>>;
        addDocument(document:Document): Promise<Document>;
    }

    // Tag ///////////////////////////////////////////////////////////

    interface TagProperties {
        id?:string;
        name?:string;
        level?:number;
    }

    interface Tag {
        getId():string;
        getName():string;
        getLevel():number;
        properties():any;
        clone(o?:any): Tag;
    }

    interface TagStore {
        getAll() : Promise<Array<TagProperties>>;
        addTag(tag:Tag): Promise<any>;
        getTagById(tagId:string): Promise<Tag>;
        delete(tagId:string): Promise<number>;
        getStoreImplementation(): any;
    }

    // Document ////////////////////////////////////////////////////////

    interface DocumentProperties {
        id:string;
        name?:string;
        tags?:Array<Tag>;
    }

    interface Document {
        getId():string;
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