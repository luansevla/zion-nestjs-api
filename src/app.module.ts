import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { MeetingModule } from './meeting/meeting.module';
import { CellModule } from './cell/cell.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UserModule,
    AddressModule,
    MeetingModule,
    CellModule,
    AuthModule,
    MailerModule.forRootAsync({
      inject: [ConfigService], // Injetamos o ConfigService aqui
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'), // Usamos config.get() em vez de process.env
          port: config.get<number>('MAIL_PORT'),
          secure: true, // true para 465
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASS'),
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
