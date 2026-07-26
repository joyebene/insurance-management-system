"use client";

import Link from "next/link";

import AuthCard from "@/components/ui/AuthCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import {
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Update Firebase Auth profile
            await updateProfile(user, {
                displayName: fullName,
            });

            // Save additional user information in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                fullName,
                email,
                phone,
                role: "customer",
                createdAt: serverTimestamp(),
            });

            router.replace("/dashboard");
        } catch (err: any) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("An account with this email already exists.");
                    break;

                case "auth/invalid-email":
                    setError("Please enter a valid email address.");
                    break;

                case "auth/weak-password":
                    setError("Password must be at least 6 characters long.");
                    break;

                case "auth/network-request-failed":
                    setError("Network error. Please check your internet connection.");
                    break;

                case "auth/too-many-requests":
                    setError("Too many attempts. Please try again later.");
                    break;

                default:
                    setError("Registration failed. Please try again.");
                    console.error(err);
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard
            title="Create Account"
            description="Join All Round Insurance today."
        >
            <form className="space-y-5" onSubmit={handleRegister}>

                <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)
                    }
                />

                <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && (
                    <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}


                <Button type="submit" loading={loading}>
                    Create Account
                </Button>

            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-amber-600"
                >
                    Login
                </Link>
            </p>
        </AuthCard>
    );
}