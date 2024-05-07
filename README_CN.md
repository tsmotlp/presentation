<div align="center">

# Presentation <img src="https://img.shields.io/badge/MIT-License-blue">
</div>

简体中文 | [English](README.md)

`Presentation` 是一个为团队或小组设计的Presentation管理应用程序，用户可以创建、删除和查看自己或其他团队成员创建的演示文稿项。

## 功能介绍
### 登录/注册
要创建一个Presentation，您需要登录。如果您还没有账号，请前往注册页面创建账号。
![](/public/login1.PNG)
![](/public/login2.PNG)

### 创建Presentation
一个Presentation包括presentation的标题、封面图片、介绍、presentation主题的动机、结论、可获得的灵感以及Presentation的 PowerPoint 文件。
![](/public/create-item1.PNG)
![](/public/create-item2.PNG)

### 删除Presentation
删除您创建的任何演示文稿项。
![](/public/delete-item.PNG)

### 关于Presentation的详细信息
点击一个Presentation，系统会将您重定向到该项的详细信息页面，页面包括演示文稿封面、标题、动机、结论、他人可以从中学到什么、Presentation的 PowerPoint 文件以及与Presentation相关的附件。
![](/public/item-detail.PNG)

### 编辑Presentation项
如果您需要修改演示文稿项的详细信息，点击`Edit`按钮使得项详情变为可编辑状态。修改完成后，点击`Save`按钮保存您的更新。
![](/public/edit.PNG)
![](/public/save.PNG)

### 附件管理
附件与您的Presentation相关，可能包括论文、博客、新闻文章或代码片段。添加附件时需填写其标题和链接。
![](/public/add-attachment1.PNG)
![](/public/add-attachment2.PNG)

## 部署
按照以下步骤在您自己的服务器或个人电脑上部署 `Presentation`：
### 1. 克隆代码
```bash
git clone https://github.com/tsmotlp/presentation.git
```
### 2. 安装依赖
```bash
cd /path/to/presentation
npm install
```

### 3. 运行应用程序
```bash
npm run dev
```
然后，您可以通过访问 `http://localhost:3000` 来使用 `Presentation`。

## 版权与许可
本仓库的内容根据 [MIT许可证](https://github.com/tsmotlp/presentation/blob/master/LICENSE) 授权。我们尊重并遵守每篇论文和资源的版权及使用权限。

## 联系方式
如果您有任何问题或建议，请通过以下方式联系我们：
- [提交问题](https://github.com/tsmotlp/presentation/issues)
- 邮箱：`yqhuang2912@gmail.com`