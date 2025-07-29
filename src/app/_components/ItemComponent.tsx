'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ItemProps {
  title: string;
  icon: string;
  url: string;
}

export function ItemComponent({ title, icon, url }: ItemProps) {
  const isExternal = url.startsWith('http');

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition w-[80px] h-[80px] text-center"
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-[0.75rem] mt-1 text-gray-800">{title}</p>
    </motion.div>
  );

  return isExternal ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={url}>{content}</Link>
  );
}
