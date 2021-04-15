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
- [Visualisation](#Visualisation)

## Auth
AUTH procedures are made via [JWT](https://jwt.io/).

## Dialog
For storing Questions/Answers we use [Algolia](https://www.algolia.com/), for search - [Algolia Answers](https://www.algolia.com/doc/guides/algolia-ai/answers/)

## Files
For storing files we use [GridFS](https://docs.mongodb.com/manual/core/gridfs/).

## HumanticAPI
For getting information about a person through Linkedin profile - we use [HumanticAPI](https://humantic.ai/)

## Metrics
We use metrics for:
- tracking usage of external API's: [Algolia](#Dialog) and [HumanticAPI](#HumanticAPI)
- tracking usage of [HumanticAPI](#HumanticAPI), that a user does
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

## Visualisation
### Parsing Linkedin profiles
- user puts a person's Linkedin profile into dedicated input
- user receives all the parsed information about a person gradually. The first portion comes instantly, the second one comes after 20 seconds interval

### Controlled audio-record
- user presses `Start` button
- voice-recognition starts working and records users's speech
- user presses `Stop` button
- front-end sends the speech to the server
- server sends a response that contains content for **Question** / **Answer** / **Transcript**
- **Transcript** is a pure speech without any kind of transpiling
- **Questions / Answers** are dedicated types of content (columns) that get generated from our AlgoliaDB (on the basis of previously parsed PDF docs)

### Uncontrolled audi-record
- user presses `Auto record` button
- voice-recognition starts working and records users's speech
- after every 15-seconds interval front-end sends the speech to the server
- server sends a response that contains content for **Question** / **Answer** / **Transcript**
- **Transcript** is a pure speech without any kind of transpiling
- **Questions / Answers** are dedicated types of content (columns) that get generated from our AlgoliaDB (on the basis of previously parsed PDF docs)

