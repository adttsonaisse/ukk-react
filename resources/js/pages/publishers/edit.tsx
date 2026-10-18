import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { update } from "@/routes/publishers";
import { Publisher } from "@/types/publisher";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({publisher} : {publisher: Publisher}) {
    const { data, setData, patch, processing, errors } = useForm({
        name: publisher.name,
        city: publisher.city
    });

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        patch(update(publisher.id).url)
    }

    return (
        <>
            <Head title="Edit Data" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            type="text"
                            value={data.city}
                            onChange={(e) => setData("city", e.target.value)}
                        />
                        <InputError message={errors.city} className="mt-2" />
                    </div>

                    <Button disabled={processing} type="submit">{processing ? 'Memproses' : 'Submit'}</Button>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: "Edit Data",
            href: '#',
        },
    ],
};
