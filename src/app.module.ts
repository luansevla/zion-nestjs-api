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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/zion_api'),
    UserModule,
    AddressModule,
    MeetingModule,
    CellModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'luan.devalltime@gmail.com',
          pass: 'gagd nyud spcz kasc',
        },
      },
      defaults: {
        from: '"Zion API" <O Alvo>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
