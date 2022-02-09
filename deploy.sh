#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run docs:build

# cd 到构建输出的目录下
cd docs-dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git config --local https.proxy socks5://127.0.0.1:1086

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/viewweiwu/amiya.git master:gh-pages

cd -
