# Stellar Burgers

- [Ссылки](#ссылки)
- [Разработка](#разработка)
- [Code Style](#code-style)

## Ссылки

- [Макет Figma](https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-Проектные-задачи_external_link?node-id=0%3A1)
- UI-компоненты Яндекс -
  [npm](https://www.npmjs.com/package/@ya.praktikum/react-developer-burger-ui-components),
  [документация](https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/)

## Разработка

```bash
npm install

npm run dev
```

## Code Style

Файловая структура:

- Компоненты хранятся в директории `src/components/`, шрифты — в `src/fonts/`, изображения — в `src/images/`.
- Каждый компонент хранится в отдельной директории.
- Для стилизации компонентов используется CSS-модули.
- Директории и файлы компонентов называются в kebab-case нотации.

HTML-верстка:

- Использовать семантические HTML5-элементы, которые точно располагаются на главной странице: `header`, `nav`, `main`, `section`.
- Оформлять повторяющиеся элементы в неупорядоченные списки.
- Стараться не использовать элемент `div`. Он подходит исключительно для «упаковки» нескольких блоков с их последующей стилизацией и построением сетки.
