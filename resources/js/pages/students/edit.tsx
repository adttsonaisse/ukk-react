import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { index, update } from '@/routes/students';
import { Student } from '@/types/student';
import { Head, useForm } from '@inertiajs/react';

interface EditProps {
    student: Student;
}

export default function Edit({ student }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: student.name,
        classroom: student.classroom,
        gender: student.gender,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(student.id).url);
    };

    return (
        <>
            <Head title="Edit Siswa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="max-w-xl">
                    <h1 className="mb-4 text-xl font-semibold">Edit Siswa</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Siswa</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Masukkan nama siswa"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="classroom">Kelas</Label>
                            <Input
                                id="classroom"
                                type="text"
                                placeholder="Contoh: XII RPL 1"
                                value={data.classroom}
                                onChange={(e) => setData('classroom', e.target.value)}
                            />
                            <InputError message={errors.classroom} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Jenis Kelamin</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label
                                    htmlFor="gender-male"
                                    className={cn(
                                        'flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-all hover:bg-accent/50',
                                        data.gender === 'male'
                                            ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                            : 'border-input hover:border-zinc-400'
                                    )}
                                >
                                    <input
                                        type="radio"
                                        id="gender-male"
                                        name="gender"
                                        value="male"
                                        checked={data.gender === 'male'}
                                        onChange={(e) => setData('gender', e.target.value as 'male')}
                                        className="h-4 w-4 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium">Laki-laki</span>
                                </label>

                                <label
                                    htmlFor="gender-female"
                                    className={cn(
                                        'flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-all hover:bg-accent/50',
                                        data.gender === 'female'
                                            ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                            : 'border-input hover:border-zinc-400'
                                    )}
                                >
                                    <input
                                        type="radio"
                                        id="gender-female"
                                        name="gender"
                                        value="female"
                                        checked={data.gender === 'female'}
                                        onChange={(e) => setData('gender', e.target.value as 'female')}
                                        className="h-4 w-4 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium">Perempuan</span>
                                </label>
                            </div>
                            <InputError message={errors.gender} />
                        </div>

                        <Button disabled={processing} type="submit">
                            {processing ? 'Memproses...' : 'Perbarui'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Data Siswa',
            href: index(),
        },
        {
            title: 'Edit Siswa',
            href: '#',
        },
    ],
};
