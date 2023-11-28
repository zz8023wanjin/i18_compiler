# i18_compiler
将csv文件转换生成项目多语言所需要的json文件

# Installation
```
npm install i18_compiler
```
or 
```
pnpm add i18_compiler
```

# Usage
在项目根目录下通过命令行 或者 package.json script 中直接使用
```
i18_compiler
```
# Configuration
通过在项目package.json中的 "i18_compiler" 字段中配置

# Options
| Command | Description |
| --- | --- |
| input | 指定csv文件的相对路径 |
| output | 指定生成json文件的路径，如果文件夹不存在，则生成 |
| key | 指定csv文件中的KEY字段 |
