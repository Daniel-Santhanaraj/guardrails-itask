import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
const envModule = ConfigModule.forRoot({
  isGlobal: true,
});
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from 'src/config/typeorm.config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    ResultsModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
