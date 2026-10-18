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
import { create, store } from "@/routes/books";
import { Author } from "@/types/author";
import { Category } from "@/types/category";
import { Publisher } from "@/types/publisher";
import { Head, useForm } from "@inertiajs/react";

interface CreateProps {
    categories: Category[];
    authors: Author[];
    publishers: Publisher[];
}

export default function Create({
    categories,
    authors,
    publishers,
}: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        category_id: "",
        author_id: "",
        publisher_id: "",
        year: "",
        image_url: null as File | null,
        stock: "",
    });

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        post(store().url);
    };

    return (
        <>
            <Head title="Tambah Data" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Title</Label>
                        <Input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Category</Label>
                        <Select
                            value={data.category_id}
                            onValueChange={(val) => setData("category_id", val)}
                        >
                            <SelectTrigger className="w-full" id="category_id">
                                <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category, index) => (
                                    <SelectItem
                                        key={category.id}
                                        value={String(category.id)}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError
                            message={errors.category_id}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Author</Label>
                        <Select
                            value={data.author_id}
                            onValueChange={(val) => setData("author_id", val)}
                        >
                            <SelectTrigger className="w-full" id="author_id">
                                <SelectValue placeholder="Pilih Penulis" />
                            </SelectTrigger>
                            <SelectContent>
                                {authors.map((author, index) => (
                                    <SelectItem
                                        key={author.id}
                                        value={String(author.id)}
                                    >
                                        {author.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError
                            message={errors.author_id}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Publisher</Label>
                        <Select
                            value={data.publisher_id}
                            onValueChange={(val) =>
                                setData("publisher_id", val)
                            }
                        >
                            <SelectTrigger className="w-full" id="publisher_id">
                                <SelectValue placeholder="Pilih Penerbit" />
                            </SelectTrigger>
                            <SelectContent>
                                {publishers.map((publisher, index) => (
                                    <SelectItem
                                        key={publisher.id}
                                        value={String(publisher.id)}
                                    >
                                        {publisher.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError
                            message={errors.publisher_id}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Year</Label>
                        <Input
                            type="text"
                            value={data.year}
                            onChange={(e) => setData("year", e.target.value)}
                        />
                        <InputError message={errors.year} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Photo</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    "image_url",
                                    e.target.files?.[0] ?? null,
                                )
                            }
                        />
                        <InputError
                            message={errors.image_url}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Stock</Label>
                        <Input
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                        />
                        <InputError message={errors.stock} className="mt-2" />
                    </div>

                    <Button disabled={processing} type="submit">
                        {processing ? "Memproses" : "Submit"}
                    </Button>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: "Tambah Data",
            href: create(),
        },
    ],
};
