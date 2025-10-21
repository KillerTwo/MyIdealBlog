"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Settings,
  User,
  TrendingUp,
  BookOpen,
  Tag,
  BarChart3,
} from "lucide-react";
import { CreatePostDialog } from "@/components/blog/create-post-dialog";
import { author, categories, tags, posts } from "@/lib/data";

// import { checkAuth } from "@/lib/dal/auth-dal";
import { useSession } from "next-auth/react";

export function Sidebar() {
  const hotPosts = posts.slice(0, 5);
  const hotTags = tags.slice(0, 10);

  // const { isAuthenticated, user } = await checkAuth()
  const { data: session } = useSession();

  return (
    <div className="space-y-2">
      {session && (
        /*博主介绍*/
        <Card className="shadow-md border-0 h-80 bg-white">
          {/*<CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center text-gray-800">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            博主介绍
          </CardTitle>
        </CardHeader>*/}
          <CardContent
            className="space-y-4"
            style={{ fontSize: "13px", color: "#9ca3af" }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24 mb-4 ring-4 ring-blue-100">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
                    {author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="font-bold text-xl" style={{ color: "#9ca3af" }}>
                {author.name}
              </h3>
              <p
                className="mt-2 leading-relaxed px-2"
                style={{ fontSize: "13px", color: "#9ca3af" }}
              >
                {author.bio}
              </p>
              <div
                className="flex gap-4 mt-4"
                style={{ fontSize: "13px", color: "#9ca3af" }}
              >
                <div className="text-center">
                  <div className="font-semibold text-blue-600">
                    {posts.length}
                  </div>
                  <div>文章</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">
                    {categories.length}
                  </div>
                  <div>分类</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">
                    {tags.length}
                  </div>
                  <div>标签</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 网站统计 */}
      {/*<Card className={session ? "shadow-md border-0 bg-white mt-8"
            : "shadow-md border-0 bg-white"}>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center" style={{ fontSize: '0.8rem', color: '#34495E' }}>
                    <BarChart3 className="h-5 w-5 mr-2 text-slate-600" />
                    网站统计
                </CardTitle>
            </CardHeader>
            <CardContent style={{ fontSize: '13px', color: '#9ca3af' }}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
                        <div className="mt-1" style={{ fontSize: '13px', color: '#9ca3af' }}>文章总数</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-green-600">{categories.length}</div>
                        <div className="mt-1" style={{ fontSize: '13px', color: '#9ca3af' }}>分类数量</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">{tags.length}</div>
                        <div className="mt-1" style={{ fontSize: '13px', color: '#9ca3af' }}>标签数量</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-orange-600">
                            {posts.reduce((sum, post) => sum + post.viewCount, 0)}
                        </div>
                        <div className="mt-1" style={{ fontSize: '13px', color: '#9ca3af' }}>总访问量</div>
                    </div>
                </div>
            </CardContent>
        </Card>*/}

      {session && (
        /*管理专区*/
        <Card className="shadow-md border-0 bg-white">
          <CardHeader className="pb-2">
            <CardTitle
              className="flex items-center"
              style={{ fontSize: "0.8rem", color: "#34495E" }}
            >
              <Settings className="h-5 w-5 mr-2 text-emerald-600" />
              管理专区
            </CardTitle>
          </CardHeader>
          <CardContent style={{ fontSize: "13px", color: "#9ca3af" }}>
            <div className="grid grid-cols-2 gap-3">
              <CreatePostDialog>
                <Button
                  variant="outline"
                  className="w-full justify-center border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 hover:border-emerald-300 transition-all duration-200 font-medium text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  发布博客
                </Button>
              </CreatePostDialog>
              <Button
                asChild
                variant="outline"
                className="w-full justify-center border text-gray-700 hover:bg-gray-50 hover:text-gray-800 hover:border-primary/50 transition-all duration-200 font-medium text-sm"
              >
                <Link href="/admin/dashboard">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  后台管理
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 分类 */}
      <Card
        className={
          !session
            ? "shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-200"
            : "shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-200"
        }
      >
        <CardHeader className="pb-2">
          <CardTitle
            className="flex items-center"
            style={{ fontSize: "0.8rem", color: "#34495E" }}
          >
            <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
            文章分类
          </CardTitle>
        </CardHeader>
        <CardContent style={{ fontSize: "13px", color: "#9ca3af" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-indigo-50 transition-all duration-200 group"
              >
                <span
                  className="font-medium group-hover:text-indigo-700"
                  style={{ fontSize: "13px", color: "#9ca3af" }}
                >
                  {category.name}
                </span>
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200"
                >
                  {category.postCount}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 热门标签 */}
      <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle
            className="flex items-center"
            style={{ fontSize: "0.8rem", color: "#34495E" }}
          >
            <Tag className="h-5 w-5 mr-2 text-purple-600" />
            热门标签
          </CardTitle>
        </CardHeader>
        <CardContent style={{ fontSize: "13px", color: "#9ca3af" }}>
          <div className="flex flex-wrap gap-2">
            {hotTags.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-200 cursor-pointer"
                >
                  {tag.name} ({tag.postCount})
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 热门文章 */}
      <Card className="shadow-md border-0 bg-white hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle
            className="flex items-center"
            style={{ fontSize: "0.8rem", color: "#34495E" }}
          >
            <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
            热门文章
          </CardTitle>
        </CardHeader>
        <CardContent style={{ fontSize: "13px", color: "#9ca3af" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            {hotPosts.map((post, index) => (
              <div key={post.id}>
                <Link
                  href={`/posts/${post.id}`}
                  className="block hover:text-orange-600 transition-colors line-clamp-2 p-2 rounded-md hover:bg-orange-50 font-medium"
                  style={{ fontSize: "13px", color: "#34495E" }}
                >
                  <span className="inline-block w-5 h-5 text-xs bg-orange-100 text-orange-600 rounded-full text-center leading-5 mr-2 font-bold">
                    {index + 1}
                  </span>
                  {post.title}
                </Link>
                {index < hotPosts.length - 1 && (
                  <Separator style={{ marginTop: "0.4rem" }} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
