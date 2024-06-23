微服务项目（Z次元）——后台管理端

个人主页：https://ahzoo.cn

Github：（十玖八柒）https://github.com/ooahz

## 运行部署

### 安装依赖

```shell
pnpm install
```

### 运行调试

```
 pnpm dev
```

默认启动地址为：http://localhost:3500

### 打包部署

```shell
pnpm run build
```

将打包后的dist文件夹上传至服务器即可

## 关于

基于pure-admin-thin v5.3.0开发完成。
破环性改动：权限和token过期时间改为完全由后端控制，因此前端相关处理逻辑被删除弃用