   // src/components/Navbar.tsx
   import Link from "next/link";

   export default function Navbar() {
     return (
       <nav className="w-full flex justify-center py-6 bg-white border-b border-gray-100 mb-8">
         <ul className="flex space-x-8 text-lg font-medium text-gray-800">
           <li><Link href="/">首页</Link></li>
           <li><Link href="/about">关于</Link></li>
           <li><Link href="/projects">项目</Link></li>
           <li><Link href="/blog">博客</Link></li>
           <li><Link href="/resources">资源</Link></li>
         </ul>
       </nav>
     );
   }