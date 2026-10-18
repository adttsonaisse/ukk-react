import { Head, Link, router } from '@inertiajs/react';
import { create, destroy, edit, index } from '@/routes/authors';
import { Button } from '@/components/ui/button';
import { Author } from '@/types/author';

export default function Index({ authors } : { authors: Author[] }) {
    const handleDelete = (id:number) => {
        router.delete(destroy(id).url)
    }

    return (
        <>
            <Head title="Data Category" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link className='underline' href={create()}>Tambah Data</Link>
                <table>
                    <thead className='bg-zinc-800'>
                        <tr className='text-left'>
                            <th className='p-3'>No</th>
                            <th className='p-3'>Name</th>
                            <th className='p-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.length === 0 ? (
                            <tr className='hover:bg-zinc-800/10 transition-colors duration-300'>
                                <td className='p-3 text-center' colSpan={3}>Data Kosong!</td>
                            </tr>
                        ) : authors.map((cateogory, index) => (
                            <tr className='hover:bg-gray-800/10 transition-colors duration-300' key={cateogory.id}>
                                <td className='p-3'>{ index + 1}</td>
                                <td className='p-3'>{cateogory.name}</td>
                                <td className='p-3 space-x-2'>
                                    <Link href={edit(cateogory.id).url}>
                                        <Button variant={'default'}>Edit</Button>
                                    </Link>
                                    <Button variant={'destructive'} onClick={() => handleDelete(cateogory.id)}>Delete</Button>
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
            title: 'Data Author',
            href: index(),
        },
    ],
};
