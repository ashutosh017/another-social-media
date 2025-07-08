    // types/next-request.d.ts
    import { User } from '@/app/generated/prisma';
import { NextRequest } from 'next/server';

    declare module 'next/server' {
      interface NextRequest {
        user?: User; // Replace 'myCustomProperty' and 'string' with your desired property name and type
        // You can add more properties here as needed
      }
    }