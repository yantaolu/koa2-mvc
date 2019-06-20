## Koa2-MVC

#### 基于Koa2官方脚手架搭建项目改造而成

#### 代码结构说明

- routers.js

> 路由入口文件，路由是经过 controller 目录下的入口文件转化而成，使用 "require-all" 模块加载

> 除 index.js（前缀路径为"/"） 以外默认使用路由文件名作为前缀路径，例如 user.js （前缀路径为"/user"）

> 文件名多单词建议使用"-"链接，不建议使用驼峰

> 以上逻辑可以根据实际需求在 routers.js 中更改

- controller.js

> 模块路由，根据实际业务创建

> 此处采用对外暴露单例对象的方式，key 值即为请求的路径（注意需要拼接前缀路径）

> key 值默认对应的为 get 请求，需要使用其他类型只需要在 key 前增加类似 "post:" 或者 "post " 即表示该路径仅支持 post 请求，具体逻辑参照 routers.js

- service.js

> 业务逻辑处理代码，不做赘述

- model.js

> 数据模型代码，此处使用了 <a href="http://docs.sequelizejs.com" target="_blank">Sequelize</a> 作为 ORM，代码中以 mysql 数据库为例

- utils

> aes.js 为加解密工具，使用 aes-128-cbc 方式加解密，此处用作数据库密码加解密操作，避免代码中出现明文

> http.js 基于 axios 封装 http(s) 工具，代替 nodejs 自己的 http 及 https

> sequelize.js 基于 mysql 数据库创建的 Sequelize 实例，同时暴露 Sequelize 及 Sequelize.Model，在 model.js 中引入更方便

