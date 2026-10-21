# 步步有为网站入口

访问 https://karo-blue.github.io/ 自动跳转到 https://karo-blue.github.io/buyunlu/ 。

使用 `location.replace` 避免返回时反复进入跳转页，保留查询参数与片段标识；关闭 JavaScript 时使用 meta refresh，并提供手动入口。

验证：`node --test tests/redirect.test.cjs`。

GitHub Pages 从 `main` 分支的根目录发布。游戏内容仍由原 `karo-blue/buyunlu` 仓库提供。
