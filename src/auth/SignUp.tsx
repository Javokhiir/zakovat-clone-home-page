import { useState } from 'react';
import {supabase} from "@/integrations/supabase/client.ts";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        bio: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email || !form.password || !form.name) {
            toast.error("Iltimos, Ism, Email va Parolni to'ldiring.");
            return;
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: form.email,
            password: form.password
        });

        if (authError) {
            toast.error('Roʻyxatdan oʻtishda xatolik: ' + authError.message);
            return;
        }

        const userId = authData?.user?.id;
        if (!userId) {
            toast.error("Foydalanuvchi ID olinmadi.");
            return;
        }

        const { error: insertError } = await supabase.from('users').insert({
            id: userId,
            name: form.name,
            email: form.email,
            phone: form.phone,
            bio: form.bio,
            join_date: new Date().toISOString()
        });

        if (insertError) {
            toast.error("Profil yaratishda xatolik: " + insertError.message);
        } else {
            toast.success("Roʻyxatdan muvaffaqiyatli oʻtdingiz!");
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSignup} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-5">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Roʻyxatdan oʻtish</h2>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ism va familiya</label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Ism va familiya"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-300 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Parol"
                    value={form.password}
                    onChange={handleChange}
                    className="border border-gray-300 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <Input
                    id="phone"
                    name="phone"
                    placeholder="Telefon"
                    value={form.phone}
                    onChange={handleChange}
                    className="border border-gray-300 focus:border-blue-500"
                />
            </div>

            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">O'zingiz haqingizda</label>
                <textarea
                    id="bio"
                    name="bio"
                    placeholder="O'zingiz haqingizda"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 focus:border-blue-500 resize-none"
                    rows={4}
                ></textarea>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition">
                Ro‘yxatdan o‘tish
            </Button>
        </form>
    );
};

export default SignupForm;
