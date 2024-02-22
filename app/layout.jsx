import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';

export const metadata = {
  title: 'PropertyPulse | Find the Perfect Rental',
  // description: 'Find your dream home with Property Pulse, the ultimate rental property search engine. Browse through thousands of properties and find the perfect one for you.',
  description: 'Find your dream rental home with PropertyPulse, a comprehensive real estate search engine that helps you find the perfect place to live or invest in.',
  keywords: 'rental, find rentals, find properties'

}

const MainLayout = ({ children}) => {
  return (
    <html lang='en'>
        <body>
          <Navbar />
            <main>{children}</main>   
        </body>
    </html>
  )
}

export default MainLayout