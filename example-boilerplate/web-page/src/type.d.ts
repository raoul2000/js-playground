declare namespace App {
    /**
     * Represent a person
     */
    interface Person {
        /**
         * Identifier for a person
         */
        id:string;
        /**
         * Name of a person. If not provided a default value is used
         */
        name?:string
    }
}