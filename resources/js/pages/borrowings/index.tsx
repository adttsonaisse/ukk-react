import { Head, Link, router } from "@inertiajs/react";
import { create, destroy, edit, index } from "@/routes/borrowings";
import { Button } from "@/components/ui/button";
import { Borrowing } from "@/types/borrowing";

export default function Index({ borrowings }: { borrowings: Borrowing[] }) {
    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus data siswa ini?")) {
            router.delete(destroy(id).url);
        }
    };

    return (
        <>
            <Head title="Data Peminjaman" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Daftar Peminjaman</h1>
                    <Link href={create()}>
                        <Button>Tambah Peminjaman</Button>
                    </Link>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-3 font-semibold">No</th>
                                <th className="p-3 font-semibold">Nama</th>
                                <th className="p-3 font-semibold">Buku</th>
                                <th className="p-3 font-semibold">Tanggal Pinjam</th>
                                <th className="p-3 font-semibold">Tanggal Kembali</th>
                                <th className="p-3 font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {borrowings.length === 0 ? (
                                <tr>
                                    <td
                                        className="p-4 text-center text-muted-foreground"
                                        colSpan={5}
                                    >
                                        Data Peminjaman Kosong!
                                    </td>
                                </tr>
                            ) : (
                                borrowings.map((borrowing, idx) => (
                                    <tr
                                        className="hover:bg-muted/50 transition-colors"
                                        key={borrowing.id}
                                    >
                                        <td className="p-3">{idx + 1}</td>
                                        <td className="p-3 font-medium">
                                            {borrowing.student?.name}
                                        </td>
                                        <td className="p-3">
                                            {borrowing.book?.title}
                                        </td>
                                        <td className="p-3">
                                            {new Date(
                                                borrowing.borrowing_date,
                                            ).toLocaleString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td className="p-3">
                                            {borrowing.return_date
                                                ? new Date(
                                                      borrowing.return_date,
                                                  ).toLocaleString("id-ID", {
                                                      day: "2-digit",
                                                      month: "long",
                                                      year: "numeric",
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                  })
                                                : "-"}
                                        </td>
                                        <td className="p-3 space-x-2">
                                            <Link href={edit(borrowing.id).url}>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleDelete(borrowing.id)
                                                }
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
            title: "Data Peminjaman",
            href: index(),
        },
    ],
};
