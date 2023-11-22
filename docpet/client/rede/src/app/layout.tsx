"use client"

import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { UserContextProvider } from '@/context/UserContext'


const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const queryClient = new QueryClient()
  return (
    
    <html lang="pt-br">
    <head>
      <meta name="author" content="@joyzinhw, @danieluau" />
      <meta name="description" content="codpet, um site para cadrastro de animais" />
      <meta name="keywords" content="sites, web, animais, cadrastro, adoção, localizacao" />
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body className={inter.className}><QueryClientProvider client={queryClient}><UserContextProvider>{children}</UserContextProvider></QueryClientProvider>
    </body>
    <title>CodPet</title>
  </html>
);
};