# INHouse

## Backend
- [AUTH flow](#Auth)
- [Dialog](#Dialog)
- [Files](#Files)
- [HumanticAPI](#HumanticAPI)
- [Metrics](#Metrics)
- [Parser](#Parser)
- [SpeechRecognition](#SpeechRecognition)
- [TextAnalyzer](#TextAnalyzer)
- [User](#User)

## Auth
AUTH procedures are made via [JWT](https://jwt.io/).

## Dialog
For storing Questions/Answers we use [Algolia](https://www.algolia.com/), for search - [Algolia Answers](https://www.algolia.com/doc/guides/algolia-ai/answers/)

## Files
For storing files we use [GridFS](https://docs.mongodb.com/manual/core/gridfs/).

## HumanticAPI
For getting information about a person through Linkedin profile - we use [Humantic API](https://humantic.ai/)

## Metrics
We use metrics for:
- tracking usage of external API's: [Algolia](#Dialog) and [Humantic API](#Humantic API)
- tracking usage of [Humantic API](#Humantic API), that a user does
- tracking recorded messages, that were received through [SpeechRecognition](#SpeechRecognition) 

## Parser
We use Parser for:
- parsing PDF files
- parsing questions from recognized message 

## SpeechRecognition
For speech recognition we use [Microsof Cognitive Services Speech](https://azure.microsoft.com/ru-ru/services/cognitive-services/speech-services/).

## TextAnalyzer
For text analyze we use API, that makes questions from received text.

## User
Users and the rest of the app's information is being stored into our DB - [MongoDB](https://www.mongodb.com/).
