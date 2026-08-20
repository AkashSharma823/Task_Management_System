import './globals.css';
import { AppProvider } from '../components/AppProvider';

export const metadata = { title: 'Dexter — Task Management', description: 'Responsive task management system' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><AppProvider>{children}</AppProvider></body></html>;
}
