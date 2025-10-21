import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageCircle, Clock, Flame, ThumbsUp } from 'lucide-react';
import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm', { locale: zhCN });
  // 判断是否为热门文章（例如：浏览量大于100）
  const isHot = post.viewCount > 100;
  // 判断是否为推荐文章（例如：评论数大于5）
  const isRecommended = post.commentCount > 5;

  return (
    <div className="ub-border-bottom pb-6 mb-6">
      <div>
        <div className="lg:truncate">
          {/* 置顶标签 */}
          <span className="align-top inline-flex items-center gap-1 leading-6 px-2.5 py-0.5 rounded-md text-sm bg-[#E8F0FF] text-[#5B8FF9] font-medium">
            置顶
          </span>

          {/* 热门标签 */}
          {isHot && (
            <span className="align-top inline-flex items-center gap-1 leading-6 px-2.5 py-0.5 rounded-md text-sm bg-[#FFE8E8] text-[#F5686F] font-medium ml-2">
              <Flame className="w-3.5 h-3.5" />
              热门
            </span>
          )}

          {/* 推荐标签 */}
          {isRecommended && (
            <span className="align-top inline-flex items-center gap-1 leading-6 px-2.5 py-0.5 rounded-md text-sm bg-[#FFF7E6] text-[#FAAD14] font-medium ml-2">
              <ThumbsUp className="w-3.5 h-3.5" />
              推荐
            </span>
          )}

          {/* 标题 - ModStart样式 */}
          <Link
            href={`/posts/${post.id}`}
            className="align-top leading-6 transition-colors hover:!text-[#004ca5]"
            style={{ fontSize: '20px', color: '#34495E' }}
          >
            {post.title}
          </Link>
        </div>
      </div>

      <div className="flex mt-2 flex-col-reverse lg:flex-row">
        <div className="flex-grow overflow-hidden">
          {/* 分类和统计信息 - ModStart样式 */}
          <div className="text-gray-400 pt-2 text-sm">
            <Link href={`/categories/${post.category.slug}`} className="hover:text-primary transition-colors">
              <span className="mr-1">📂</span>
              {post.category.name}
            </Link>
            <span>&nbsp;</span>

            <Clock className="inline h-3.5 w-3.5" />
            <span className="ml-1">{formattedDate}</span>
            <span>&nbsp;</span>

            <Eye className="inline h-3.5 w-3.5" />
            <span className="ml-1">{post.viewCount || 0}</span>
            <span>&nbsp;</span>

            <MessageCircle className="inline h-3.5 w-3.5" />
            <span className="ml-1">{post.commentCount || 0}</span>
            <span>&nbsp;</span>
          </div>

          {/* 摘要 - ModStart样式 */}
          {post.summary && (
            <div className="text-gray-400 pt-2 h-14 leading-6 overflow-hidden" style={{ fontSize: '13px' }}>
              {post.summary}
            </div>
          )}

          {/* 标签 - ModStart样式 */}
          {post.tags.length > 0 && (
            <div className="pt-2">
              {post.tags.map((tag) => (
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  <Badge
                    variant="secondary"
                    className="text-xs mr-1 mb-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded"
                  >
                    {tag.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 右侧图片区 - ModStart样式 */}
        {post.coverImage && (
          <div className="lg:w-40 w-full lg:ml-4 flex-shrink-0">
            <Link href={`/posts/${post.id}`} className="overflow-hidden rounded block">
              <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover hover:rotate-3 hover:scale-110 duration-300 ease-in-out rounded transform"
                />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}