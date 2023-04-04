import { AppProps } from 'next/app'
import { Container, Header, Content, Footer, Sidebar } from 'rsuite';

type LayoutProps = {
  children: React.ReactNode,
};

export default function Layout( { children } : LayoutProps) {
  return (
    <div className="font-mono relative">
      <Header className="">
        Driver Data
      </Header>
      <Content>
        <main className='place-content-center p-10'>{children}</main>
      </Content>
      <Footer><div className="place-content-center">Footer</div></Footer>
    </div>
  )
}