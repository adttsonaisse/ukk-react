import { Head, Link, router } from '@inertiajs/react';
import { create, destroy, edit, index } from '@/routes/publishers';
import { Button } from '@/components/ui/button';
import { Publisher } from '@/types/publisher';

export default function Index({ publishers } : { publishers: Publisher[] }) {
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
                            <th className='p-3'>Name</th>
                            <th className='p-3'>City</th>
                            <th className='p-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishers.length === 0 ? (
                            <tr className='hover:bg-zinc-800/10 transition-colors duration-300'>
                                <td className='p-3 text-center' colSpan={4}>Data Kosong!</td>
                            </tr>
                        ) : publishers.map((publisher, index) => (
                            <tr className='hover:bg-gray-800/10 transition-colors duration-300' key={publisher.id}>
                                <td className='p-3'>{ index + 1}</td>
                                <td className='p-3'>{publisher.name}</td>
                                <td className='p-3'>{publisher.city}</td>
                                <td className='p-3 space-x-2'>
                                    <Link href={edit(publisher.id).url}>
                                        <Button variant={'default'}>Edit</Button>
                                    </Link>
                                    <Button variant={'destructive'} onClick={() => handleDelete(publisher.id)}>Delete</Button>
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
