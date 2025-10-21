import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderOpen } from 'lucide-react';
import { categories } from '@/lib/data';
import ContentLayout from "@/components/layout/content-layout";

export default function CategoriesPage() {
  return (
      <ContentLayout>
          <div className="ub-content-box">
            <div className="flex items-center mb-8">
              <FolderOpen className="h-8 w-8 mr-3 text-primary" />
              <h1 className="text-3xl font-bold">文章分类</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border hover:border-primary/50">
                    <CardHeader className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          {category.postCount} 篇
                        </Badge>
                      </div>
                      {category.description && (
                        <CardDescription className="text-sm text-gray-500 line-clamp-2">
                          {category.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
      </ContentLayout>
  );
}