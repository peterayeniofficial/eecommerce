import { RemovalPolicy } from "aws-cdk-lib";
import {
  AttributeType,
  BillingMode,
  ITable,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class EcommerceDatabase extends Construct {
  public readonly productTable: ITable;
  public readonly basketTable: ITable;
  public readonly orderTable: ITable


  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Provision Dynamo DB

    // product Table
    this.productTable = this.createProductTable();

    // basket Table
    this.basketTable = this.createBasketTable();

    // order Table
    this.basketTable = this.createOrderTable()
  }
  private createProductTable(): ITable {
    const productTable = new Table(this, "product", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: "product",
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
    return productTable;
  }

  private createBasketTable(): ITable {
    // basket
    const bascketTable = new Table(this, "basket", {
      partitionKey: {
        name: "username",
        type: AttributeType.STRING,
      },
      tableName: "basket",

      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
    return bascketTable
  }

  private createOrderTable(): ITable {
    // basket
    const orderTable = new Table(this, "order", {
      partitionKey: {
        name: "username",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "orderDate",
        type: AttributeType.STRING,
      },
      tableName: "order",
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });
    return orderTable
  }
}
