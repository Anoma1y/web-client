# JAGO WEB CLIENT
### Порядок установки

Создать файл окружения
```
cp .env.example .env
```

Подтянуть npm пакеты
```
yarn install
```

Прилинковать редьюсеры
```
yarn generate:reducers
```

Если необходимо сбилдить проект, необходимо запустить
```
yarn build
```
Эта команда соберет проект, и положит его в папку `build`

Если необходимо запустить проект для разработки, необходимо выпполнить
```
yarn dev
```