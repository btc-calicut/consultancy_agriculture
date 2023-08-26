import { Layout } from 'antd';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AboutPage from './pages/AboutPage/AboutPage';
import ProductPage from './pages/ProductPage/ProductPage';
import EnquiryPage from './pages/EnquiryPage/EnquiryPage';

function App() {
  return (
    <Layout className="bg-blue-100">
      <Header />
      <Layout.Content>
        <AboutPage />
        <ProductPage />
        <EnquiryPage />
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default App;
