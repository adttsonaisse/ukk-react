import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { index, update } from "@/routes/borrowings";
import { Book } from "@/types/book";
import { Borrowing } from "@/types/borrowing";
import { Student } from "@/types/student";
import { Head, useForm } from "@inertiajs/react";

interface EditProps {
    borrowing: Borrowing;
    students: Student[];
    books: Book[];
}

export default function Edit({ borrowing, students, books }: EditProps) {
    const formatDate = (dateString?: string | null) => {
        if (!dateString) return "";
        return String(dateString).substring(0, 10);
    };

    const { data, setData, patch, processing, errors } = useForm({
        student_id: String(borrowing.student_id),
        book_id: String(borrowing.book_id),
        borrowing_date: formatDate(borrowing.borrowing_date),
        return_date: formatDate(borrowing.return_date ?? borrowing.return_date),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(update(borrowing.id).url);
    };

    return (
        <>
            <Head title="Edit Peminjaman" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 max-w-xl">
                <h1 className="text-xl font-semibold">Edit Peminjaman</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="student_id">Pilih Siswa</Label>
                        <Select
                            value={data.student_id}
                            onValueChange={(val) => setData("student_id", val)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Siswa" />
                            </SelectTrigger>
                            <SelectContent>
                                {students.map((student) => (
                                    <SelectItem
                                        key={student.id}
                                        value={String(student.id)}
                                    >
                                        {student.name} ({student.classroom})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.student_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="book_id">Pilih Buku</Label>
                        <Select
                            value={data.book_id}
                            onValueChange={(val) => setData("book_id", val)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Buku" />
                            </SelectTrigger>
                            <SelectContent>
                                {books.map((book) => (
                                    <SelectItem
                                        key={book.id}
                                        value={String(book.id)}
                                    >
                                        {book.title} (Sisa: {book.stock})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.book_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="borrowing_date">Tanggal Pinjam</Label>
                        <Input
                            id="borrowing_date"
                            type="date"
                            value={data.borrowing_date}
                            onChange={(e) =>
                                setData("borrowing_date", e.target.value)
                            }
                        />
                        <InputError message={errors.borrowing_date} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="return_date">
                            Tanggal Kembali (Opsional)
                        </Label>
                        <Input
                            id="return_date"
                            type="date"
                            value={data.return_date}
                            onChange={(e) =>
                                setData("return_date", e.target.value)
                            }
                        />
                        <InputError message={errors.return_date} />
                    </div>

                    <Button disabled={processing} type="submit">
                        {processing ? "Memproses..." : "Perbarui Peminjaman"}
                    </Button>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: "Data Peminjaman", href: index() },
        { title: "Edit Peminjaman", href: "#" },
    ],
};
