"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";

import Loader from "@/components/ui/Loader";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({
    children,
}: AuthLayoutProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                router.replace("/dashboard");
                return;
            }

            setLoading(false);

        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="min-h-screen bg-slate-100">

            <div className="grid min-h-screen lg:grid-cols-2">
                {/* Left */}
                <section className="hidden lg:flex lg:flex-col lg:justify-between bg-cover bg-center bg-no-repeat bg-[url('/OIP.webp')]">
                    <div className="bg-black/50 p-12 flex-1 flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-white">
                            Insurance Management System
                            </h1>
                            <p className="mt-4 max-w-md text-slate-300">
                                Secure insurance management for customers and administrators.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-semibold text-white">
                                Insurance Management System
                            </h2>
                            <p className="mt-4 text-slate-400">
                                Secure • Reliable • Fast
                            </p>
                        </div>
                    </div>
                </section>

                {/* Right */}

                <section className="flex items-center justify-center p-8">
                    {children}
                </section>

            </div>

        </main>
    );
}