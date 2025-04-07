# Проектная работа "Веб-ларек"

Выполнил: Мартынов Павел Максимович РИ-230948, АТ-02
Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом
- src/components/model/ — папка с кодом модели
- src/components/view/ — папка с кодом отображения

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения. тут находятся все подписки на события, все экземпляры классов
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо:
в корне проекта создать файл .env с таким содержимым: 
API_ORIGIN=https://larek-api.nomoreparties.co
и выполнить команды

```
npm install
npm run start
```

## Сборка

```
npm run build - продакшн
npm run build:dev - в режиме разработчика
```

## Архитектура
Проект построен по MV-паттерну, где есть модель и отображение, которые взаимодействуют между собой посредством брокера событий.
Подробнее про описание классов в документации по ссылке:
[Документация проекта WEB-ларёк](https://docs.google.com/document/d/1pWJ59DLIhLnRrmXu9oQ7urKcIwQtCeU-iOjduT20YD8/edit?usp=sharing)