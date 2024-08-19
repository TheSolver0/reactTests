import * as ReactDOMServer from 'react-dom/server';
import {App} from './App.js';
import React from 'react';
import Koa from 'koa';
import serve from 'koa-static';

const app = new Koa();
app.use(serve("./dist"));
app.use((ctx) => {
    const html = ReactDOMServer.renderToString(<App />);

    ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="main.js" defer></script>
</head>
<body>
<div id="root">${html}</div>
</body>
</html>`
})

app.listen(8000);
