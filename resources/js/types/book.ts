import { Author } from "./author";
import { Category } from "./category";
import { Publisher } from "./publisher";

export interface Book {
    id: number;
    title: string;
    category_id: number;
    author_id: number;
    publisher_id: number;
    year: number;
    image_url: string;
    stock: number;
    category?: Category
    author?: Author
    publisher: Publisher
}
