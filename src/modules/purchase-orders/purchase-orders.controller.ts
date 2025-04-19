import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import path from 'path';
import PdfPrinter from 'pdfmake';

@Controller('purchase-order')
export class PurchaseOrdersController {

  constructor(
    private readonly purchaseOrderService: PurchaseOrdersService
  ) {}

  @Post('create')
  async create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return await this.purchaseOrderService.create(createPurchaseOrderDto);
  }

  @Get('all')
  async findAll() {
    return await this.purchaseOrderService.findAll();
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return await this.purchaseOrderService.findOne(id);
  }

  @Get(':id/pdf')
async getPurchaseOrderPdf(@Param('id') id: string, @Res() res: Response) {
  const order = await this.purchaseOrderService.findOne(id);

  const fonts = {
    Roboto: {
      normal: path.join(__dirname, '../../../fonts/Roboto-Regular.ttf'),
      bold: path.join(__dirname, '../../../fonts/Roboto-Medium.ttf'),
      italics: path.join(__dirname, '../../../fonts/Roboto-Italic.ttf'),
      bolditalics: path.join(__dirname, '../../../fonts/Roboto-MediumItalic.ttf'),
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      { text: 'ORDEN DE COMPRA', style: 'header', alignment: 'center' },
      { text: `Número de Requisición: ${order.numberRequisition}`, style: 'subheader' },
      { text: `Cotización: ${order.quoteNumber}` },
      { text: `Sucursal: ${order.branchName}`, margin: [0, 0, 0, 10] },

      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Información del Departamento:', style: 'label' },
              { text: `Departamento: ${order.departament}` },
              { text: `Dirección: ${order.direction}` },
              { text: `Ciudad: ${order.city}` },
              { text: `Teléfono: ${order.phone}` },
              { text: `Email: ${order.email}` },
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Información del Proveedor:', style: 'label' },
              { text: `Proveedor: ${order.supplierName}` },
              { text: `Departamento: ${order.departamentName}` },
              { text: `Dirección: ${order.supplierAddress}` },
              { text: `Teléfono: ${order.supplierPhone}` },
              { text: `Email: ${order.supplierEmail}` },
            ]
          }
        ],
        columnGap: 20,
        margin: [0, 10, 0, 20]
      },

      { text: 'Productos Solicitados:', style: 'subheader' },

      {
        table: {
          widths: ['*', '*', 'auto', 'auto'],
          body: [
            ['Nombre', 'Descripción', 'Cantidad', 'Total'],
            ...order.products.map(p => [
              p.name,
              p.description,
              p.amount.toString(),
              `$${p.total.toFixed(2)}`
            ])
          ]
        }
      },

      {
        text: `\nCondiciones de Pago: ${order.conditionOfPayment}`,
        style: 'footer',
        margin: [0, 20, 0, 0]
      }
    ],
    styles: {
      header: { fontSize: 20, bold: true },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      label: { fontSize: 12, bold: true, margin: [0, 5, 0, 2] },
      footer: { fontSize: 12 }
    },
    defaultStyle: {
      font: 'Roboto'
    }
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=orden_compra.pdf');
  pdfDoc.pipe(res);
  pdfDoc.end();
  }

}
