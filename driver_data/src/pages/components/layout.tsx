import { AppProps } from 'next/app'
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

type LayoutProps = {
  children: React.ReactNode,
};

export default function Layout( { children } : LayoutProps) {
  return (
    <div className="font-mono relative">
      <Header className="text-center">
        Driver Data
      </Header>
      <Content>
        <main className='place-content-center p-10'>{children}</main>
      </Content>
      <Footer className="text-center">Footer</Footer>
    </div>
  )
}