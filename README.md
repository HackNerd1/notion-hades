# Notion Hades

<!-- ![landing page](./docs/landing%20page.gif)
![post list](./docs/post%20list.gif)
![article](./docs/article.gif)
![blog detail](./docs/search.gif) -->

![Main page](./docs/Main%20page.png)

## Features

Blog features

- [x] Blog list
- [x] Blog detail
- [x] Blog search
- [x] Mobile view
- [x] Table of contents
- [x] Social media image
- [x] Auto-generated sitemap
- [x] JSON-LD structured data
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
- [x] Table
- [x] toggle
- [x] mention page
- [x] mention person
- [x] Video
- [x] Audio
- [x] File
- [ ] Database
- [ ] Chart
- [ ] Button

## SEO Features

### Sitemap Generation

The project automatically generates and updates sitemaps for better search engine indexing.

### JSON-LD Structured Data

This project implements JSON-LD structured data for better SEO:

- Website schema on all pages
- BlogPosting schema on blog posts
- BreadcrumbList schema on blog posts

The structured data is automatically generated based on your content and configuration.

### Setup SEO Features

1. Set the required environment variables in your `.env` file:
```shell
SITE_URL=https://your-domain.com
```

2. Configure your site information in `src/config/site.config.ts`:
```typescript
metaData: {
  title: "Your Site Name",
  description: "Your site description",
  author: "Your Name"
}
```

## Demos

- [Post example](https://blog.hacknerd.top/post/1c8985ec-c354-80c8-8eaa-fdc28fabb06e)
- [My Site](https://blog.hackerd.top)

## Requirements

This project require `Node` >= 20.

## Getting Started

Firstly, create `.env` file and set environment variables:

```shell
NOTION_HOME_PAGE_ID=<your Home Page Id>
NOTION_DATABASE_ID=<your Database Id>
NOTION_API_KEY=<your Internal Integration Secret>
SITE_URL=<your Site URL>
```

Wonder how to get these variables? See 👉 [How to get Env Variables](#how-to-get-env-variables).

Secondly, run these command:

```shell
> npm install
> npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to get Env Variables

First, click 👉 [Notion hades template](https://aback-degree-5d2.notion.site/Notion-Hades-1ac985ecc354807192a4fa16c65409a5?pvs=4) to copy **_notion hades template_** to notion database.
![Notion hades template](./docs//notion%20template.png)
Secondly, follow this documents [https://developers.notion.com/docs/authorization](https://developers.notion.com/docs/authorization) and then visit 👉 [https://www.notion.so/profile/integrations](https://www.notion.so/profile/integrations) to create a new integration.

![integration](./docs/intergration.png)

Thirdly, click integration you created, and copy to get your `Internal Integration Secret`
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
https://www.notion.so/<your Home Page Id>?v=<some hash>&pvs=4

or

https://aback-degree-5d2.notion.site/Notion-Hades-<your Database Id>?pvs=4
```

## Deploy on Vercel

You can deploy your app with Vercel. Remember to set these environment variables in Vercel:
- `NOTION_HOME_PAGE_ID`
- `NOTION_DATABASE_ID`
- `NOTION_API_KEY`
- `SITE_URL` (required for sitemap generation)

![Deploy on vercel](./docs/Deploy%20on%20vercel.png)
You can check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
