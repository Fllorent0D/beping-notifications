import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './auth-basic.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConsumerEntity } from '../model/api-consumer.entity';



@Module({
	imports: [PassportModule, TypeOrmModule.forFeature([ApiConsumerEntity])],
	providers: [AuthService, BasicStrategy],
})
export class AuthModule {

}
