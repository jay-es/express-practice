# TypeScript
## paths
エイリアスの設定は、コンパイル時に書き換えられない（`@/foo`のまま）

# MongoDB
## Windows環境変数Path
C:\Program Files\MongoDB\Server\4.0\bin

## モデル名
mongoose.model メソッドの第一引数はコレクション名の単数形にする（パスカル）
複数形で小文字にしたコレクションを自動的に探してくれる

## Windowsサービス登録
```powershell
mongod.exe --config "C:\Program Files\MongoDB\Server\4.0\bin\mongod.cfg" --install --serviceName MongoDB
```

## JSON ファイルからインポート
```powershell
mongoimport.exe --db express-practice --collection users --file r:\users.json --drop --maintainInsertionOrder
```

# JSON データ取得元
https://jsonplaceholder.typicode.com/

