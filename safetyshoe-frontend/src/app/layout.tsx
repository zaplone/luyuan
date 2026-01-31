// 这是一个纯净的根布局，仅用于处理 404 或全局错误
// 所有的业务代码和多语言 Provider 都在 [locale]/layout.tsx 中
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}