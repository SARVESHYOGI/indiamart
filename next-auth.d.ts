import { DefaultSession } from 'next-auth';
import 'next-auth';
import NextAuthUser from 'next-auth/src/core/types';
declare module 'next-auth' {
    interface User extends NextAuthUser {
        _id?: string;
        username?: string;
        role?: string;
    }
    interface Session {
        user: {
            _id?: string;
            username?: string;
            email?: string;
            role?: string;
        }
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string;
        username?:string;
        email?:string;  
        role?:string;
    }
}