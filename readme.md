# nodeJS-rest-api

### Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими исправлениями простых ошибок

## Домашнее задание 2

Создай ветку `02-express` из ветки `master`.

Написать REST API для работы с коллекцией контактов. Для работы с REST API
используй [Postman](https://www.getpostman.com/).

### Шаг 1

Добавь в проект пакеты [express](https://www.npmjs.com/package/express),
[morgan](https://www.npmjs.com/package/morgan) и
[cors](https://www.npmjs.com/package/cors).

### Шаг 2

В index.js веб сервер на express и добавляем прослойки morgan и cors. Настраивай
раутинг для работы с коллекцией контактов.

REST API должен поддерживать следующие рауты.

#### @ GET /api/contacts

- ничего не получает
- вызывает функцию `listContacts` для работы с json-файлом contacts.json
- возвращает массив всех контактов в json-формате со статусом 200

#### @ GET /api/contacts/:contactId

- Не получает body
- Получает параметр `contactId`
- вызывает функцию getById для работы с json-файлом contacts.json
- если такой id есть, возвращает обьект контакта в json-формате со статусом 200
- если такого id нет, возвращает json с ключом `"message": "Not found"` и
  статусом 404

#### @ POST /api/contacts

- Получает body в формате `{name, email, phone}`
- Если в body нет каких-то обязательных полей, возарщает json с ключом
  `{"message": "missing required name field"}` и статусом 400
- Если с body все хорошо, добавляет уникальный идентификатор в обьект контакта
- Вызывает функцию `addContact(body)` для сохранения контакта в файле
  contacts.json
- По результату работы функции возвращает обьект с добавленным id
  `{id, name, email, phone}` и статусом 201

#### @ DELETE /api/contacts/:contactId

- Не получает body
- Получает параметр `contactId`
- вызывает функцию `removeContact` для работы с json-файлом contacts.json
- если такой id есть, возвращает json формата `{"message": "contact deleted"}` и
  статусом 200
- если такого id нет, возвращает json с ключом `"message": "Not found"` и
  статусом 404

#### @ PATCH /api/contacts/:contactId

- Получает параметр `contactId`
- Получает body в json-формате c обновлением любых полей `name, email и phone`
- Если body нет, возарщает json с ключом `{"message": "missing fields"}` и
  статусом 400
- Если с body все хорошо, вызывает функцию `updateContact(contactId, body)`
  (напиши ее) для обновления контакта в файле contacts.json
- По результату работы функции возвращает обновленный обьект контакта и
  статусом 200. В противном случае, возвращает json с ключом
  `"message": "Not found"` и статусом 404

## Домашнее задание 3

Создай ветку `03-mongodb` из ветки `master`.

Продолжи создание REST API для работы с коллекцией контактов.

### Шаг 1

Создай аккаунт на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). После
чего в аккаунте создай новый проект и настрой **бесплатный кластер**. Во время
настройки кластера выбери провавйдера и регион как на скриншоте ниже. Если
выбрать слишком удаленный регион, скорость ответа сервера будет дольше.

### Шаг 2

Установи графический редактор
[MongoDB Compass](https://www.mongodb.com/download-center/compass) для удобной
работы с базой данных для MongoDB. Настрой подключение своей облачной базы
данных к Compass. В MongoDB Atlas не забудь создать пользователя с правами
администратора.

### Шаг 3

Через Compass создай базу данных `db-contacts` и в ней коллекцию `contacts`.
При помощи Compass наполни коллекцию
`contacts` (сделай импорт) его содержимым.

### Шаг 4

Используй исходный код домашней работы #2 и замени
хранение контактов из json-файла на созданную тобой базу данных.

- Напиши код для создания подключения к MongoDB при помощи
  [Mongoose](https://mongoosejs.com/).
  - При успешном подключении выведи в консоль сообщение
    `"Database connection successful"`.
  - Обязательно обработай ошибку подключения. Выведи в консоль сообщение ошибки
    и заверши процесс используя `process.exit(1)`.
- В функциях обработки запросов замени код CRUD-операций над контактами из
  файла, на Mongoose-методы для работы с коллекцией контактов в базе данных.

  ## Домашнее задание 4

Создай ветку `04-auth` из ветки `master`.

Продолжи создание REST API для работы с коллекцией контактов. Добавь логику
аутентификации/авторизации пользователя через [JWT](https://jwt.io/).

### Шаг 1

В коде создай схему и модель пользователя для коллекции `users`.

```js
{
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free"
  },
  token: String
}
```

Измените схему контактов, чтобы каждый пользователь видел только свои контакты.
Для этого в схеме контактов добавьте свойство

```js
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
```

### Шаг 2

#### Регистрация

Создать ендпоинт [`/auth/register`](#registration-request)

Сделать валидацию всех обязательных полей (email и password). При ошибке
валидации вернуть [Ошибку валидации](#registration-validation-error).

В случае успешной валидации в модели `User` создать пользователя по данным
которые прошли валидацию. Для засолки паролей используй
[bcrypt](https://www.npmjs.com/package/bcrypt)

- Если почта уже используется кем-то другим, вернуть
  [Ошибку Conflict](#registration-conflict-error).
- В противном случае вернуть [Успешный ответ](#registration-success-response).

##### Registration request

```shell
POST /auth/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

##### Registration validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой валидационной библиотеки>
```

##### Registration conflict error

```shell
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

##### Registration success response

```shell
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "free"
  }
}
```

#### Логин

Создать ендпоинт [`/auth/login`](#login-request)

В модели `User` найти пользователя по `email`.

Сделать валидацию всех обязательных полей (email и password). При ошибке
валидации вернуть [Ошибку валидации](#validation-error-login).

- В противном случае, сравнить пароль для найденного юзера, если пароли
  совпадают создать токен, сохранить в текущем юзере и вернуть
  [Успешный ответ](#login-success-response).
- Если пароль или имейл неверный, вернуть
  [Ошибку Unauthorized](#login-auth-error).

##### Login request

```shell
POST /auth/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

##### Login validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой валидационной библиотеки>
```

##### Login success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "free"
  }
}
```

##### Login auth error

```shell
Status: 401 Unauthorized
ResponseBody: Email or password is wrong
```

### Шаг 3

#### Проверка токена

Создай мидлвар для проверки токена и добавь его ко всем раутам которые должны
быть защищены.

- Мидлвар берет токен из заголовков `Authorization`, проверяет токен на
  валидность.
- В случае ошибки вернуть [Ошибку Unauthorized](#middleware-unauthorized-error).
- Если валидация прошла успешно, получить из токена id пользователя. Найти
  пользователя в базе данных по этому id. Если пользователь существует, записать
  его данные в `req.user` и вызвать `next()`. Если пользователя с таким id не
  существет, вернуть [Ошибку Unauthorized](#middleware-unauthorized-error)

##### Middleware unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

### Шаг 4

#### Логаут

Создать ендпоинт [`/auth/logout`](#logout-request)

Добавь в раут мидлвар проверки токена.

- В модели `User` найти пользователя по `_id`.
- Если пользователя не сущестует вернуть
  [Ошибку Unauthorized](#logout-unauthorized-error).
- В противном случае, удалить токен в текущем юзере и вернуть
  [Успешный ответ](#logout-success-response).

##### Logout request

```shell
POST /auth/logout
Authorization: "Bearer token"
```

##### Logout unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

##### Logout success response

```shell
Status: 204 No Content
```

#### Текущий - получить данные юзера по токену

Создать ендпоинт [`/users/current`](#current-user-request)

Добавь в раут мидлвар проверки токена.

- Если пользователя не сущестует вернуть
  [Ошибку Unauthorized](#current-user-unauthorized-error)
- В противном случае вернуть [Успешный ответ](#current-user-success-response)

##### Current user request

```shell
GET /users/current
Authorization: "Bearer token"
```

##### Current user unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

##### Current user success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "free"
}
```

### Дополнительное задание - необязательное

- Сделать пагинацию с
  [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) для
  коллекции контактов (GET /contacts?page=1&limit=20).
- Сделать фильтрацию контактов по типу подписки (GET /contacts?sub=free)
- Обновление подписки (`subscription`) пользователя через ендпоинт PATCH /users.
  Подписка должна иметь одно из следующих значений `['free', 'pro', 'premium']`

## Домашнее задание 5

Создай ветку `05-images` из ветки `master`.

Продолжи создание REST API для работы с коллекцией контактов. Добавь возможность
загрузки аватарки пользователя через
[Multer](https://github.com/expressjs/multer).

### Шаг 1

Создай папку `public` для раздачи статики. В этой папке сделай папку `images`.
Настрой Express на раздачу статических файлов из папки `public`.

Положи любое изображение в папку `public/images` и проверь что раздача статики
работает. При переходе по такому URL браузер отобразит изображение.

```shell
http://locahost:<порт>/images/<имя файла с расширением>
```

### Шаг 2

В схему пользователя добавь новое свойство `avatarURL` для хранения изображения.

```shell
{
  email: String,
  password: String,
  avatarURL: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free"
  }
}
```

- Используй пакет gravatar для того чтобы при регистрации нового пользователя
  сразу сгенерить ему аватар по его email.
- Создай папку `tmp` в корне проекта и сохраняй в неё созданную аватарку.

### Шаг 3

При регистрации пользователя:

- Создавай изображение испопользуя генератор аватарок из шага 2
- Перенеси аватар из папки `tmp` в папку `public/images`
- Создай URL для аватара. Например
  `http://locahost:3000/images/<имя файла с расширением>`
- Сохрани созданный URL в поле `avatarURL` во время создания пользователя

### Шаг 4

Добавь возможность обновления данных уже созданного пользователя, в том числе
аватарки.

```shell
# Запрос
PATCH /users/avatars
Content-Type: multipart/form-data
Authorization: "Bearer token"
RequestBody: загруженный файл

# Успешный ответ
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "avatarURL": "тут будет ссылка на изображение"
}

# Неуспешный ответ
Status: 401 BAD
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

### Дополнительное задание - необязательное

#### 1. Написать юнит-тесты для мидлвара по авторизации

(при помощи [mocha](https://www.npmjs.com/package/mocha),
[sinon](https://www.npmjs.com/package/sinon))

- все методы и функции, вызываемые мидлваром (вместе с next) должны быть
  заглушены при помощи sinon
- нужно проверить количество вызовов заглушок и аргументы с которыми они
  вызывались в случаях, когда:
  - пользователь не передал токен в `Authorization` заголовке
  - токен пользователя невалидный
  - токен пользователя валидный

```
Подсказка:
Иногда Вам может понадобится переопределить возвращаемые значения
методов-заглушок
```

#### 2. Написать приемочные тесты для ендпоинта обновления аватарок

(дополнительно нужно будет использовать
[supertest](https://www.npmjs.com/package/supertest))

Тесты должны проверять:

- возвращается ли ответ со статус кодом 401, если токен пользователя невалидный
- В случае, если все прошло успешно, проверить:
  - возвращается ли ответ со статус кодом 200
  - возвращается ли тело ответа в правильном формате
  - добавляется ли `avatarUrl` в документ целевого пользователя
