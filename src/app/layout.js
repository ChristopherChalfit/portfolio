import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { DM_Sans } from 'next/font/google'
import '@/styles/_Global.sass'
import AuthProvider from '@/components/authprovider/Authprovider'
import ReduxProvider from '@/redux/ReduxProvider'
import SchemaOrg from '@/components/SchemaOrg/SchemaOrg'
import Head from 'next/head'
const DMSans = DM_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Christopher Chalafit',
  description: 'Portfolio par Christopher Chalafit pour Christopher Chalafit, Si vous souhaitez rechercher un développeur web vous êtes sur la bonne page',
  metadataBase: new URL("https://christopher-chalafit.fr/"),
  openGraph: {
    title: 'Christopher Chalafit',
    description: 'Portfolio par Christopher Chalafit pour Christopher Chalafit, Si vous souhaitez rechercher un développeur web vous êtes sur la bonne page',
    url: 'https://christopher-chalafit.fr/',
    siteName: 'Christopher Chalafit',
    images: [
      {
        url: 'https://christopher-chalafit.fr/g5Eu1XCD.png', // Must be an absolute URL
        width: 800,
        height: 600,
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ChristChalafit9',
    title: 'Christopher Chalafit',
    description: 'Portfolio par Christopher Chalafit pour Christopher Chalafit, Si vous souhaitez rechercher un développeur web vous êtes sur la bonne page',
    image: 'https://christopher-chalafit.fr/g5Eu1XCD.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
    <html lang="fr">
      <head>
      <SchemaOrg /> 
      </head>
      <body className={`portfolio ${DMSans.className}`}> <AuthProvider><Header/>{children}<Footer/></AuthProvider></body>
    </html>
    </ReduxProvider>
  )
}
