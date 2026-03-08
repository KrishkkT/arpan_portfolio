import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Sign in with Supabase
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (error || !data.user) {
                    console.error("Supabase Auth Error:", error?.message);
                    return null;
                }

                // Check if user has admin role in profiles table
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role, name')
                    .eq('id', data.user.id)
                    .single();

                // If no profile yet, we can assume first user might be admin or just return user
                // Usually, you'd check profile?.role === 'admin'

                return {
                    id: data.user.id,
                    name: profile?.name || data.user.email.split('@')[0],
                    email: data.user.email,
                    role: profile?.role || 'admin'
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
