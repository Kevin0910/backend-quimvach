import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialRequestModule } from './modules/material-request/material-request.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { PurchaseOrdersModule } from './modules/purchase-orders/purchase-orders.module';
import { PurchasedProductsModule } from './modules/purchased-products/purchased-products.module';
import { MaterialRequisitionModule } from './modules/material-requisition/material-requisition.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: ["src/bar/entities/**/*.ts"],
      autoLoadEntities: true,
      synchronize: true,
    }),
    RolesModule,
    ProductsModule,
    AuthModule,
    MaterialRequestModule,
    VoucherModule,
    PurchaseOrdersModule,
    PurchasedProductsModule,
    MaterialRequisitionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
    consumer.apply((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    }).forRoutes('*');
  }
}