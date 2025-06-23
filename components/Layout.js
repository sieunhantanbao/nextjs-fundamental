import Header from './Header';
import Footer from './Footer';
import BodyScript from './BodyScript';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
        {children}
      <Footer />
      <BodyScript />
    </div>
  );
}