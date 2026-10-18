import { Head, Link, router } from '@inertiajs/react';
import { create, destroy, edit, index } from '@/routes/books';
import { Button } from '@/components/ui/button';
import { Book } from '@/types/book';

export default function Index({ books } : { books: Book[] }) {
    const handleDelete = (id:number) => {
        router.delete(destroy(id).url)
    }

    return (
        <>
            <Head title="Data Publisher" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link className='underline' href={create()}>Tambah Data</Link>
                <table>
                    <thead className='bg-zinc-800'>
                        <tr className='text-left'>
                            <th className='p-3'>No</th>
                            <th className='p-3'>Title</th>
                            <th className='p-3'>Category</th>
                            <th className='p-3'>Author</th>
                            <th className='p-3'>Publisher</th>
                            <th className='p-3'>Year</th>
                            <th className='p-3'>Stock</th>
                            <th className='p-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 ? (
                            <tr className='hover:bg-zinc-800/10 transition-colors duration-300'>
                                <td className='p-3 text-center' colSpan={8}>Data Kosong!</td>
                            </tr>
                        ) : books.map((book, index) => (
                            <tr className='hover:bg-gray-800/10 transition-colors duration-300' key={book.id}>
                                <td className='p-3'>{ index + 1}</td>
                                <td className='p-3 flex items-center gap-2'>
                                    <img className='rounded object-cover' src={`/storage/${book.image_url}`} width={50} alt={book.title} />
                                    {book.title}
                                </td>
                                <td className='p-3'>{book.category?.name}</td>
                                <td className='p-3'>{book.author?.name}</td>
                                <td className='p-3'>{book.publisher?.name}</td>
                                <td className='p-3'>{book.year}</td>
                                <td className='p-3'>{book.stock}</td>
                                <td className='p-3 space-x-2'>
                                    <Link href={edit(book.id).url}>
                                        <Button variant={'default'}>Edit</Button>
                                    </Link>
                                    <Button variant={'destructive'} onClick={() => handleDelete(book.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Data Publisher',
            href: index(),
        },
    ],
};
