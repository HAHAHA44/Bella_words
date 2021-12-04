# README

用于听力练习或者按照翻译来背写单词并且自动纠错的一个前端页面，方便自己学习英语。

包含纠错、历史分数功能。

## run

`npm run dev`

## build

`npm run build`

## 录入单词
出于方便考虑，单词使用csv格式录入。

1. 在 src/assets/ 目录下新建 xxx.csv 文件，比如 chapter_1.csv。

文件中每行为 `英语, 翻译`。

2. 在 src/utils/config.js 中引入刚才新建的 csv 文件。

```
import chapter_1 from "../assets/chapter_1.csv";
```

3. 在 src/utils/config.js 中的 listeningAssets 数组中新增一个成员对象。

```
export const listeningAssets = [
    // ...
    // below is new item
    {
        name: "test chapter 1",
        items: Papa.parse(chapter_1).data
    }
]
```




