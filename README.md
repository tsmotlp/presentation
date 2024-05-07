<div align="center">

# Presentation <img src="https://img.shields.io/badge/MIT-License-blue">
</div>

English | [简体中文](README_CN.md)

Presentation is a management application designed for groups or teams to create, manage, and share presentation items. Users can add new presentations, delete existing ones, and view presentations created by themselves or others in the group.

## Functionality
### Login/Register to presentation
To create your own presentation item, you need to log in. If you do not have an account, visit the `sign-up` page to create one.
![](/public/login1.PNG)
![](/public/login2.PNG)

### Create an presentation item
A presentation item includes detailed information about your presentation, such as the title, a cover image, an introduction to the presentation, the motivation behind the topic, the conclusion, what inspiration can be drawn, and the PowerPoint file for the presentation.
![](/public/create-item1.PNG)
![](/public/create-item2.PNG)

### Delete an presentation item
Delete any presentation item that you have created.
![](/public/delete-item.PNG)

### Detailed infomation about the presentation
Click on a presentation item to be redirected to the item detail page, which includes the presentation cover, title, motivation, conclusion, key learnings, PowerPoint file, and attachments related to the presentation.
![](/public/item-detail.PNG)

### Edit presentation item
If you need to modify details of a presentation item, click the `Edit` button to make the item details editable. After making your modifications, click the `Save` button to save your updates.
![](/public/edit.PNG)
![](/public/save.PNG)

### Attachments management
An attachment is related to your presentation and could include papers, blogs, news articles, or code snippets. Add an attachment with its title and link.
![](/public/add-attachment1.PNG)
![](/public/add-attachment2.PNG)

## Deploy
Deploy `Presentation` on your own server or PC by following these steps:
### 1. Clone the code
```bash
git clone https://github.com/tsmotlp/presentation.git
```
### 2. Install dependencies
```bash
cd /path/to/presentation
npm install
```

### 3. Run
```bash
npm run dev
```
Then, you can navigate to `http://localhost:3000` to use `Presentation`.

## Copyright and License
The contents of this repository are licensed under the [MIT License](https://github.com/tsmotlp/presentation/blob/master/LICENSE).

## Contact Information
For any questions or suggestions, please contact us through the following:

- [Submit an Issue](https://github.com/tsmotlp/presentation/issues)
- Email: `yqhuang2912@gmail.com`