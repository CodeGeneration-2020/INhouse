# INHouse

## Backend
- [Auth](#Auth)
- [Dialog](#Dialog)
- [File](#File)
- [HumanticAi](#HumanticAi)
- [Metric](#Metric)
- [Parser](#Parser)
- [SpeechRecognition](#SpeechRecognition)
- [TextAnalyzer](#TextAnalyzer)
- [User](#User)

## Auth
Авторизация реализована с помощью [JWT](https://jwt.io/).

## Dialog
Для хранения вопросов/ответов используется [Algolia](https://www.algolia.com/), для поиска - [Algolia Answers](https://www.algolia.com/doc/guides/algolia-ai/answers/)

## File
Для хранения файлов используется [GridFS](https://docs.mongodb.com/manual/core/gridfs/)

## HumanticAi
Для получения информации о человеке по LinkedIn профилю используется [Humantic AI](https://humantic.ai/)

## Metric
Метрика используется для:
- Отслеживания вызовов сторонних API: [Algolia](#Dialog) и [HumanticAi](#HumanticAi)
- Отслеживания вызовов [HumanticAi](#HumanticAi), которые совершил пользователь
- Отслеживания записанных сообщений, которые были получены через [SpeechRecognition](#SpeechRecognition)

## Parser
Используется для:
- Парсинга PDF файлов
- Парсинга вопросов из распознанного сообщения 

## SpeechRecognition
Для распознавания речи используется [Microsof Cognitive Services Speech](https://azure.microsoft.com/ru-ru/services/cognitive-services/speech-services/)

## TextAnalyzer
Для анализа используется API, которое создаёт вопросы из полученного текста

## User
Пользователи и вся прочая информация хранится в базе данных [MongoDB](https://www.mongodb.com/)
