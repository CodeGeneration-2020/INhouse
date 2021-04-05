import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DialogModule } from './dialog/dialog.module';
import { MetricModule } from './metric/metric.module';
import { ParserModule } from './parser/parser.module';
import { HumanticAiModule } from './humantic-ai/humantic-ai.module';
import { SpeechRecognitionModule } from './speech-recognition/speech-recognition.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUri = configService.get<string>('DATABASE_URI');

        return {
          uri: databaseUri,
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    AuthModule,
    UserModule,
    DialogModule,
    MetricModule,
    ParserModule,
    HumanticAiModule,
    SpeechRecognitionModule,
  ],
})
export class AppModule {}
