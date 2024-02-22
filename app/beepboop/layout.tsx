import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from "../providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '2bttns | Code Cracked ',
  description: 'Easily capture rich user preference data to accurately personalize content in your web app. 100% Javascript. Integrate with just a few lines of code.',
  keywords: "Interactive two-button game, Web application user engagement, User preference data collection, Personalized content recommendation, JavaScript SDK integration, RESTful API for web apps, No-code admin panel, CMS functionality enhancement, User experience personalization, Algorithm bias reduction, Customizable user engagement game, Web app data management, Streamlined content curation, Enhanced web app interaction, User data analytics tool"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
