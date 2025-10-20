from django.db import models
from django.contrib.auth.models import AbstractUser

from dvadmin.system.models import Users
from dvadmin.utils.models import CoreModel, table_prefix

# class User(AbstractUser):
#     """用户模型"""
#     name = models.CharField(max_length=255, verbose_name="名字", null=True, blank=True)
#     nick_name = models.CharField(max_length=255, verbose_name="昵称", null=True, blank=True)
#     type = models.IntegerField(
#         verbose_name="用户类型 0：博主，1：其他用户 ，2：github， 3：weixin， 4：qq ( 0，1 是注册的用户； 2，3，4 都是第三方授权登录的用户)",
#         default=1
#     )
#     phone = models.CharField(max_length=20, verbose_name="手机", null=True, blank=True)
#     img_url = models.URLField(verbose_name="封面", null=True, blank=True)
#     introduce = models.TextField(verbose_name="个人介绍", null=True, blank=True)
#     avatar = models.URLField(verbose_name="头像", null=True, blank=True)
#     location = models.CharField(max_length=255, verbose_name="地址", null=True, blank=True)
#     profession = models.CharField(max_length=255, verbose_name="专业", null=True, blank=True)
#     enable = models.BooleanField(verbose_name="是否启用", default=True)
#     locked = models.BooleanField(verbose_name="是否锁定", default=False)
#     creation = models.BooleanField(verbose_name="是否有创作权", default=False)
#     user_tag = models.JSONField(verbose_name="用户标签", null=True, blank=True)
#     social = models.JSONField(verbose_name="社交账号信息", null=True, blank=True)
#     create_time = models.DateTimeField(verbose_name="创建时间", auto_now_add=True)
#     update_time = models.DateTimeField(verbose_name="最后修改时间", auto_now=True)
#
#     # 粉丝关系通过中间表处理
#     fans = models.ManyToManyField(
#         'self',
#         through='UserUserRelation',
#         through_fields=('master', 'slave'),
#         symmetrical=False,
#         related_name='following',
#         verbose_name="粉丝"
#     )
#
#     class Meta:
#         db_table = "user"
#         verbose_name = "用户"
#         verbose_name_plural = "用户"


class UserUserRelation(CoreModel):
    """用户关注关系模型"""
    master = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='master_relations')
    slave = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='slave_relations')

    class Meta:
        db_table = table_prefix + "user_user_relation"
        unique_together = ('master', 'slave')
        verbose_name = "用户关注关系"
        verbose_name_plural = "用户关注关系"


class Tag(CoreModel):
    """文章标签模型"""
    name = models.CharField(max_length=255, verbose_name="标签名称")
    desc = models.TextField(verbose_name="标签描述", null=True, blank=True)
    icon = models.URLField(verbose_name="图标", null=True, blank=True)
    create_time = models.DateTimeField(verbose_name="创建时间", auto_now_add=True)
    update_time = models.DateTimeField(verbose_name="最后修改时间", auto_now=True)

    class Meta:
        db_table = table_prefix + "tag"
        verbose_name = "标签"
        verbose_name_plural = "标签"

    def __str__(self):
        return self.name


class Category(CoreModel):
    """文章分类模型"""
    name = models.CharField(max_length=255, verbose_name="分类名称")
    desc = models.TextField(verbose_name="分类描述", null=True, blank=True)
    create_time = models.DateTimeField(verbose_name="创建时间", auto_now_add=True)
    update_time = models.DateTimeField(verbose_name="最后修改时间", auto_now=True)

    class Meta:
        db_table = table_prefix + "category"
        verbose_name = "分类"
        verbose_name_plural = "分类"

    def __str__(self):
        return self.name


class Article(CoreModel):
    """文章模型"""
    TYPE_CHOICES = [
        (1, '普通文章'),
        (2, '简历'),
        (3, '管理员介绍'),
    ]
    
    STATE_CHOICES = [
        (0, '草稿'),
        (1, '已发布'),
        (2, '待审核'),
        (3, '审核不通过'),
    ]
    
    ORIGIN_CHOICES = [
        (0, '原创'),
        (1, '转载'),
        (2, '混合'),
        (3, 'AI生成'),
    ]

    title = models.CharField(max_length=255, verbose_name="文章标题")
    slug = models.SlugField(max_length=255, verbose_name="slug", null=True, blank=True)
    keyword = models.JSONField(verbose_name="文章关键字（SEO）", null=True, blank=True)
    author = models.CharField(max_length=255, verbose_name="作者", null=True, blank=True)
    desc = models.TextField(verbose_name="文章描述", null=True, blank=True)
    content = models.TextField(verbose_name="文章内容")
    numbers = models.IntegerField(verbose_name="字数", null=True, blank=True)
    img_url = models.URLField(verbose_name="封面图", null=True, blank=True)
    type = models.IntegerField(
        choices=TYPE_CHOICES,
        default=1,
        verbose_name="文章类型"
    )
    state = models.IntegerField(
        choices=STATE_CHOICES,
        default=0,
        verbose_name="文章发布状态"
    )
    origin = models.IntegerField(
        choices=ORIGIN_CHOICES,
        default=0,
        verbose_name="文章转载状态"
    )
    user = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name='articles',
        verbose_name="文章作者"
    )
    tags = models.ManyToManyField(
        Tag,
        through='ArticleTag',
        related_name='articles',
        verbose_name="文章标签"
    )
    category = models.ManyToManyField(
        Category,
        through='ArticleCategory',
        related_name='articles',
        verbose_name="文章分类"
    )
    like_users = models.JSONField(verbose_name="点赞用户", null=True, blank=True)
    meta = models.JSONField(verbose_name="元信息", null=True, blank=True)
    create_time = models.DateTimeField(verbose_name="创建时间", auto_now_add=True)
    update_time = models.DateTimeField(verbose_name="最后修改时间", auto_now=True)

    class Meta:
        db_table = table_prefix + "article"
        verbose_name = "文章"
        verbose_name_plural = "文章"
        ordering = ['-create_time']

    def __str__(self):
        return self.title


class ArticleTag(CoreModel):
    """文章标签关联模型"""
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    class Meta:
        db_table = table_prefix + "article_tag"
        unique_together = ('article', 'tag')
        verbose_name = "文章标签关联"
        verbose_name_plural = "文章标签关联"


class ArticleCategory(CoreModel):
    """文章分类关联模型"""
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        db_table = table_prefix + "article_category"
        unique_together = ('article', 'category')
        verbose_name = "文章分类关联"
        verbose_name_plural = "文章分类关联"


class Comment(CoreModel):
    """文章评论模型"""
    STATE_CHOICES = [
        (0, '待审核'),
        (1, '通过正常'),
        (-1, '已删除'),
        (-2, '垃圾评论'),
    ]
    
    HANDLE_CHOICES = [
        (1, '是'),
        (2, '否'),
    ]

    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name='comments',
        verbose_name="评论所在的文章"
    )
    content = models.TextField(verbose_name="内容")
    is_top = models.BooleanField(verbose_name="是否置顶", default=False)
    likes = models.IntegerField(verbose_name="被赞数", default=0)
    user_id = models.IntegerField(verbose_name="评论用户 id")
    """
        父评论的用户信息
        {
            // 用户id
            user_id: String,
            // 名字
            name: String,
            // 用户类型
            0：博主
            1：其他用户
            type: int,
            // 头像
            avatar: String,
        }
        """
    user = models.JSONField(verbose_name="父评论的用户信息", null=True, blank=True)
    """
        其他人评论关系
        [
    		{
    			谁在评论
    			user: {
    				user_id: int,

    				名字
    				name: String,

    				用户类型 0：博主 1：其他用户
    				type: int,

    				头像
    				avatar:String
    			},

    			对谁评论
    			to_user: { 
    				user_id: int,

    				名字
    				name: String,

    				用户类型 0：博主 1：其他用户
    				type: int,

    				头像
    				avatar:String
    			},
    			被赞数
    			likes: int,

                评论内容
    			content: String,
    			状态 => 0 待审核 / 1 通过正常 / -1 已删除 / -2 垃圾评论
    			state: int,
    			创建日期
    			create_time: date,
    		},
    	]
        """
    other_comments = models.JSONField(verbose_name="其他人评论关系", null=True, blank=True)
    state = models.IntegerField(
        choices=STATE_CHOICES,
        default=0,
        verbose_name="状态"
    )
    is_handle = models.IntegerField(
        choices=HANDLE_CHOICES,
        default=2,
        verbose_name="是否已经处理过"
    )
    create_time = models.DateTimeField(verbose_name="创建时间", auto_now_add=True)
    update_time = models.DateTimeField(verbose_name="最后修改时间", auto_now=True)

    class Meta:
        db_table = table_prefix + "comment"
        verbose_name = "评论"
        verbose_name_plural = "评论"
        ordering = ['-create_time']

    def __str__(self):
        return f"{self.article.title} - {self.content[:50]}"


# class Project(models.Model):
#     """项目模型"""
#     STATE_CHOICES = [
#         (1, '已经完成'),
#         (2, '正在进行'),
#         (3, '没完成'),
#     ]
#
#     title = models.CharField(max_length=255, verbose_name="标题")
#     content = models.TextField(verbose_name="项目内容")
#     img = models.URLField(verbose_name="项目封面", null=True, blank=True)
#     url = models.URLField(verbose_name="项目链接", null=True, blank=True)
#     state = models.IntegerField(
#         choices=STATE_CHOICES,
#         default=2,
#         verbose_name="状态"
#     )
#     start_time = models.DateTimeField(verbose_name="开始日期", null=True, blank=True)
#     end_time = models.DateTimeField(verbose_name="结束日期", null=True, blank=True)
#     update_time = models.DateTimeField(verbose_name="最后修改日期", auto_now=True)
#
#     class Meta:
#         db_table = "project"
#         verbose_name = "项目"
#         verbose_name_plural = "项目"
#         ordering = ['-update_time']
#
#     def __str__(self):
#         return self.title


class LeaveMessage(CoreModel):
    """留言模型"""
    STATE_CHOICES = [
        (0, '未处理'),
        (1, '已处理'),
    ]

    user_id = models.IntegerField(verbose_name="用户 id", null=True, blank=True)
    name = models.CharField(max_length=255, verbose_name="姓名")
    avatar = models.URLField(verbose_name="头像", null=True, blank=True)
    phone = models.CharField(max_length=20, verbose_name="电话", null=True, blank=True)
    introduce = models.TextField(verbose_name="介绍", null=True, blank=True)
    content = models.TextField(verbose_name="留言内容")
    reply_list = models.JSONField(verbose_name="回复留言内容", null=True, blank=True)
    email = models.EmailField(verbose_name="邮箱", null=True, blank=True)
    state = models.IntegerField(
        choices=STATE_CHOICES,
        default=0,
        verbose_name="状态"
    )
    create_time = models.DateTimeField(verbose_name="创建日期", auto_now_add=True)
    update_time = models.DateTimeField(verbose_name="最后修改日期", auto_now=True)

    class Meta:
        db_table = table_prefix + "leave_message"
        verbose_name = "留言"
        verbose_name_plural = "留言"
        ordering = ['-create_time']

    def __str__(self):
        return f"{self.name} - {self.content[:50]}"


class TimeAxis(CoreModel):
    """时间轴模型"""
    STATE_CHOICES = [
        (1, '已经完成'),
        (2, '正在进行'),
        (3, '没完成'),
    ]

    title = models.CharField(max_length=255, verbose_name="标题")
    content = models.TextField(verbose_name="时间轴内容")
    state = models.IntegerField(
        choices=STATE_CHOICES,
        default=2,
        verbose_name="状态"
    )
    start_time = models.DateTimeField(verbose_name="开始日期", null=True, blank=True)
    end_time = models.DateTimeField(verbose_name="结束日期", null=True, blank=True)
    update_time = models.DateTimeField(verbose_name="最后修改日期", auto_now=True)

    class Meta:
        db_table = table_prefix + "time_axis"
        verbose_name = "时间轴"
        verbose_name_plural = "时间轴"
        ordering = ['-update_time']

    def __str__(self):
        return self.title


class SiteLink(CoreModel):
    """链接模型"""
    TYPE_CHOICES = [
        ('1', '其他友情链接'),
        ('2', '博主的个人链接'),
    ]
    
    STATE_CHOICES = [
        ('0', '不向外展示'),
        ('1', '向外展示'),
    ]

    name = models.CharField(max_length=255, verbose_name="链接名称")
    desc = models.TextField(verbose_name="链接描述", null=True, blank=True)
    url = models.URLField(verbose_name="链接 url")
    icon = models.URLField(verbose_name="图标", null=True, blank=True)
    type = models.CharField(
        max_length=1,
        choices=TYPE_CHOICES,
        default='1',
        verbose_name="类型"
    )
    state = models.CharField(
        max_length=1,
        choices=STATE_CHOICES,
        default='1',
        verbose_name="状态"
    )
    create_time = models.DateTimeField(verbose_name="创建时间", auto_now_add=True)
    update_time = models.DateTimeField(verbose_name="最后修改时间", auto_now=True)

    class Meta:
        db_table = table_prefix + "site_link"
        verbose_name = "链接"
        verbose_name_plural = "链接"
        ordering = ['-create_time']

    def __str__(self):
        return self.name
