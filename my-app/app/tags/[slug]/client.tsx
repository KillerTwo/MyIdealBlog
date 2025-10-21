"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BlogLayout } from '@/components/layout/blog-layout';
import { PostCard } from '@/components/blog/post-card';
import { Sidebar } from '@/components/blog/sidebar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Tag, ArrowLeft } from 'lucide-react';
import { posts } from '@/lib/data';
import type { Tag as TagType } from '@/lib/types';
import ContentLayout from "@/components/layout/content-layout";

interface TagClientProps {
  tag: TagType;
}

export function TagClient({ tag }: TagClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const tagPosts = posts.filter(post => post.tags.some(t => t.id === tag.id));
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPosts = tagPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tagPosts.length / pageSize);

  return (

      <ContentLayout>
          <div className="ub-content-box margin-bottom">
            <Link
              href="/tags"
              className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回标签列表
            </Link>

            <div className="flex items-center mb-6">
              <Tag className="h-8 w-8 mr-3 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">#{tag.name}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  共 {tagPosts.length} 篇文章
                </p>
              </div>
            </div>
          </div>

          {tagPosts.length > 0 ? (
            <>
              <div className="ub-content-box margin-bottom">
                <div className="p-3">
                  {currentPosts.map((post) => (
                    <div key={post.id}>
                      <PostCard post={post} />
                    </div>
                  ))}

                  {/* 分页信息 */}
                  <div className="text-sm text-gray-500 mt-4">
                    第 {currentPage} 页,共 {totalPages} 页 (总共 {tagPosts.length} 篇文章)
                  </div>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        >
                          <span className="hidden sm:block">上一页</span>
                        </PaginationPrevious>
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        >
                          <span className="hidden sm:block">下一页</span>
                        </PaginationNext>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="ub-content-box text-center">
              <p className="text-gray-500">该标签下暂无文章</p>
            </div>
          )}
      </ContentLayout>
  );
}