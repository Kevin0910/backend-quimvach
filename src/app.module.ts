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
import { VoucherProductModule } from './modules/voucher-product/voucher-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    RolesModule,
    ProductsModule,
    AuthModule,
    MaterialRequestModule,
    VoucherModule,
    PurchaseOrdersModule,
    PurchasedProductsModule,
    MaterialRequisitionModule,
    VoucherProductModule,
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