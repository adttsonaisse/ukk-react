import { Head, Link, router } from '@inertiajs/react';
import { create, destroy, edit, index } from '@/routes/students';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/student';

export default function Index({ students }: { students: Student[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
            router.delete(destroy(id).url);
        }
    };
    
    return (
        <>
            <Head title="Data Siswa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Daftar Siswa</h1>
                    <Link href={create()}>
                        <Button>Tambah Siswa</Button>
                    </Link>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-3 font-semibold">No</th>
                                <th className="p-3 font-semibold">Nama</th>
                                <th className="p-3 font-semibold">Kelas</th>
                                <th className="p-3 font-semibold">Jenis Kelamin</th>
                                <th className="p-3 font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {students.length === 0 ? (
                                <tr>
                                    <td className="p-4 text-center text-muted-foreground" colSpan={5}>
                                        Data Siswa Kosong!
                                    </td>
                                </tr>
                            ) : (
                                students.map((student, idx) => (
                                    <tr className="hover:bg-muted/50 transition-colors" key={student.id}>
                                        <td className="p-3">{idx + 1}</td>
                                        <td className="p-3 font-medium">{student.name}</td>
                                        <td className="p-3">{student.classroom}</td>
                                        <td className="p-3">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    student.gender === 'male'
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                                        : 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                                                }`}
                                            >
                                                {student.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                                            </span>
                                        </td>
                                        <td className="p-3 space-x-2">
                                            <Link href={edit(student.id).url}>
                                                <Button size="sm" variant="outline">Edit</Button>
                                            </Link>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                Hapus
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Data Siswa',
            href: index(),
        },
    ],
};
