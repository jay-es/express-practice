# MongoDB
## Windows環境変数Path
C:\Program Files\MongoDB\Server\4.0\bin

## Windowsサービス登録
```powershell
mongod.exe --config "C:\Program Files\MongoDB\Server\4.0\bin\mongod.cfg" --install --serviceName MongoDB
```

## JSON ファイルからインポート
```powershell
mongoimport.exe --db express-practice --collection users --drop --file r:\users.json
```

# JSON データ取得元
https://jsonplaceholder.typicode.com/

