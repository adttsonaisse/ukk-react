import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { create, index, store } from "@/routes/students";
import { Head, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        classroom: "",
        gender: "" as "male" | "female" | "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
    };

    return (
        <>
            <Head title="Tambah Siswa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="max-w-xl">
                    <h1 className="mb-4 text-xl font-semibold">Tambah Siswa</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Siswa</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Masukkan nama siswa"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
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
                                onChange={(e) =>
                                    setData("classroom", e.target.value)
                                }
                            />
                            <InputError message={errors.classroom} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Jenis Kelamin</Label>
                            <div className="flex items-center gap-6 pt-1">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="radio"
                                        id="gender-male"
                                        name="gender"
                                        value="male"
                                        checked={data.gender === "male"}
                                        onChange={(e) =>
                                            setData(
                                                "gender",
                                                e.target.value as "male",
                                            )
                                        }
                                        className="h-4 w-4 cursor-pointer"
                                    />
                                    <Label
                                        htmlFor="gender-male"
                                        className="cursor-pointer font-normal"
                                    >
                                        Laki-laki
                                    </Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Input
                                        type="radio"
                                        id="gender-female"
                                        name="gender"
                                        value="female"
                                        checked={data.gender === "female"}
                                        onChange={(e) =>
                                            setData(
                                                "gender",
                                                e.target.value as "female",
                                            )
                                        }
                                        className="h-4 w-4 cursor-pointer"
                                    />
                                    <Label
                                        htmlFor="gender-female"
                                        className="cursor-pointer font-normal"
                                    >
                                        Perempuan
                                    </Label>
                                </div>
                            </div>
                            <InputError message={errors.gender} />
                        </div>

                        <Button disabled={processing} type="submit">
                            {processing ? "Memproses..." : "Simpan"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: "Data Siswa",
            href: index(),
        },
        {
            title: "Tambah Siswa",
            href: create(),
        },
    ],
};
