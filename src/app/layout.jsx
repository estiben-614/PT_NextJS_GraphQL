import Providers from '../../redux/provider/provider'
import './globals.css'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './lib/AntdRegistry'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Catastro',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
   

    <html lang="es">
           <Providers>
            <body >
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>            
            </body>
          </Providers>
        

     
    </html>
  )
}