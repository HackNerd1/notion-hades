# Notion Hades

![landing page](./docs/landing%20page.gif)
![post list](./docs/post%20list.gif)
![article](./docs/article.gif)
![blog detail](./docs/search.gif)

## Feature

Blog features

- [x] Blog list
- [x] Blog detail
- [x] Blog search
- [x] Mobile view
- [x] Table of contents
- [ ] Social media image
- [ ] Comments

Supported notion blocks

- [x] Rich text
- [x] Mention
- [x] Link
- [x] Divider
- [x] Code
- [x] Book Mark
- [x] h1 h2 h3
- [x] list
- [x] todo
- [x] toggle
- [x] quote
- [x] image
- [x] callout
- [x] paragraph
- [ ] Table
- [ ] Video
- [ ] Audio
- [ ] Database
- [ ] Chart
- [ ] Button

## Getting Started

First, click 👉 [Notion hades template](https://aback-degree-5d2.notion.site/Notion-Hades-1ac985ecc354807192a4fa16c65409a5?pvs=4) to copy **_notion hades template_** to notion database.
![Notion hades template](./docs//notion%20template.png)
Secondly, follow this documents [https://developers.notion.com/docs/authorization](https://developers.notion.com/docs/authorization) and then visit 👉 [https://www.notion.so/profile/integrations](https://www.notion.so/profile/integrations) to create a new integration.

![integration](./docs/intergration.png)

Thirdly, click integration you created, and copy `Internal Integration Secret`
![created integration](./docs/integration%20outcome.png)
![My integration](./docs/My%20integration.png)
![Copy Internal Integration Secret](./docs/Internal%20Integration%20Secret.png)

And then, go to your notion database, and connect your integration to notion database.

![Connect integration](./docs/Connect%20integration.png)

Last but not least, get `Home Page ID` and `Database ID` from share link.
![Copy main page ID](./docs/Copy%20main%20page%20ID.png)
![Copy database ID](./docs/Copy%20database%20ID.png)
You should get some thing like this:

```plain text
https://www.notion.so/<your page id>?v=<some hash>&pvs=4

or

https://aback-degree-5d2.notion.site/Notion-Hades-<your database ID>?pvs=4
```

Lastly, install dependencies:

```shell
> npm install
```

And run the development server:

```shell
# linux/macOS
> export export NOTION_HOME_PAGE_ID=<your Home Page Id>&& export NOTION_DATABASE_ID=<your Database Id>&& export NOTION_API_KEY=<your Internal Integration Secret>&& npm run dev

# windows
> set export NOTION_HOME_PAGE_ID=<your Home Page Id>&& set NOTION_DATABASE_ID=<your Database Id>&& set NOTION_API_KEY=<your Internal Integration Secret> && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

You can deploy your app with Vercel. Remember to set `NOTION_HOME_PAGE_ID`, `NOTION_DATABASE_ID` and `NOTION_API_KEY` in Vercel environment variables.
![Deploy on vercel](./docs/Deploy%20on%20vercel.png)
You can check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
