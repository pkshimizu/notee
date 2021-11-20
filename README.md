# gmemo
Google Driveに保存するメモサービス

## 初期設定
```shell
$ yarn install
```

## 開発手順
ローカル環境で起動する場合
```shell
$ yarn dev
```
http://localhost:4000 にアクセスする

コードのフォーマットチェックと自動整形
```shell
$ yarn fix
```

## デプロイ手順
masterにコミットするとgithub actionsによって、本番環境にデプロイする
ローカル環境からデプロイする場合はいこのコマンドを実行する
```shell
$ TODO
```

## 構成
### ディレクトリ構成

[ReDucks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/)

### コンポーネント構成

[AtomicDesign](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B)

| コンポーネント | 含むコンポーネント                           | 再利用性 | 状態     | Redux アクセス |
| -------------- | -------------------------------------------- | -------- | -------- | -------------- |
| Atom           | HTML タグ<br/>Material-UI コンポーネント     | 高       | 持たない | 不可           |
| Molecule       | Atom                                         | 高       | 持てる   | 不可           |
| Organism       | Atom<br/>Molecule<br/>Organisms              | 低       | 持てる   | 可             |
| Template       | Atom<br/>Molecule<br/>Organisms              | 高       | 持たない | 不可           |
| Page           | Atom<br/>Molecule<br/>Organisms<br/>Template | 低       | 持てる   | 可             |

### MUI のスタイルについて
- [sx](https://mui.com/system/the-sx-prop/#main-content) を使用してスタイルを設定する
- スタイルは、Atomコンポーネントに使用して、その他のコンポーネントは、AtomコンポーネントのPropsを通してスタイルを指定する

## 環境
- [本番環境](https://dmemo.net/)
