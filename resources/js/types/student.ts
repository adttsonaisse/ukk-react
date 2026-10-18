export interface Student {
    id: number;
    name: string;
    classroom: string;
    gender: 'male' | 'female';
    created_at?: string;
    updated_at?: string;
}