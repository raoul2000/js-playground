import { DocumentModel } from './model';
import { DocumentParser } from './doc-parser';
import { DocumentSerializer } from './doc-serializer';

export class DocumentCloner {
  public static clone(doc:DocumentModel): DocumentModel {
    return DocumentParser.parseJSONString(
      DocumentSerializer.serializeToJSON(doc)
    );
  }
}
