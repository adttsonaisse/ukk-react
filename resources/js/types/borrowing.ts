import { Book } from "./book";
import { Student } from "./student";

export interface Borrowing {
    id: number;
    student_id: number;
    book_id: number;
    borrowing_date: string;
    return_date: string | null;
    student?: Student;
    book?: Book;
}
