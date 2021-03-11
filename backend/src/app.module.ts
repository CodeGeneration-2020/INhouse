import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SpeechRecognitionModule } from './speech-recognition/speech-recognition.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseUri = configService.get<string>('DATABASE_URI');

        return {
          uri: databaseUri,
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    SpeechRecognitionModule,
  ],
})
export class AppModule {}
