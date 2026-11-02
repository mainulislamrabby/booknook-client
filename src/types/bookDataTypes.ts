export interface BookFormData {
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName: string;
  email: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName: string;
  email: string;
  addedDate: string;
}
