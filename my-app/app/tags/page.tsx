import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';
import { tags } from '@/lib/data';
import ContentLayout from "@/components/layout/content-layout";

export default function TagsPage() {
  return (
      <ContentLayout>
          <div className="ub-content-box">
            <div className="flex items-center mb-8">
              <Tag className="h-8 w-8 mr-3 text-primary" />
              <h1 className="text-3xl font-bold">标签云</h1>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  <Badge
                    variant="outline"
                    className="text-sm px-3 py-1.5 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 border"
                    style={{
                      fontSize: `${Math.min(1.2, 0.875 + (tag.postCount / 20))}rem`
                    }}
                  >
                    #{tag.name} <span className="text-gray-400 ml-1">({tag.postCount})</span>
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
      </ContentLayout>
  );
}