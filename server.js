const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname, port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.sql':'text/plain; charset=utf-8','.md':'text/markdown; charset=utf-8'};
http.createServer((req,res)=>{
  let requested=decodeURIComponent((req.url||'/').split('?')[0]);
  if(requested==='/')requested='/index.html';
  const file=path.resolve(root,'.'+requested);
  if(!file.startsWith(root+path.sep)&&file!==path.join(root,'index.html')){res.writeHead(403);return res.end('Forbidden');}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});res.end(data);
  });
}).listen(port,'127.0.0.1',()=>console.log(`ClassVault available at http://127.0.0.1:${port}`));
