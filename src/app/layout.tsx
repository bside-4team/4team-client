'use client';

import GlobalModal from '@/components/Modal/GlobalModal';
import Toast from '@/components/Toast';
import GridLayout from '@/components/layout/grid-layout';
import MobileLayout from '@/components/layout/mobile-layout';
import ReactQueryProvider from '@/lib/react-query/ReactQueryProvider';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import localFont from 'next/font/local';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

const mainFont = localFont({
  src: '../assets/fonts/Galmuri9.woff2',
  display: 'swap',
  variable: '--Galmuri-9',
});

const subFont = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--Pretendard-Variable',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'production' && typeof window !== undefined) {
    console = window.console || {};
    console.log = function no_console() {};
    console.warn = function no_console() {};
    console.error = function () {};
  }

  return (
    <html lang="en">
      <head>
        <meta name="description" content="직장인 점심 메뉴 & 식당 추첨 서비스" />
        <title>맛셔너리</title>
      </head>
      <body className={`${subFont.variable} ${mainFont.variable}`}>
        <StyledComponentsRegistry>
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <GlobalModal />
              <Toast />
              <ReactQueryProvider>
                <MobileLayout>
                  <GridLayout>{children}</GridLayout>
                </MobileLayout>
              </ReactQueryProvider>
            </ThemeProvider>
          </RecoilRoot>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
