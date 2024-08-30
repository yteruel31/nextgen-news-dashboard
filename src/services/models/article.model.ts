export interface Article {
  id: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  fields: {
    thumbnail: string;
  };
  tags: {
    id: string;
    sectionId: string;
  }[];
  isSaved?: boolean;
}
