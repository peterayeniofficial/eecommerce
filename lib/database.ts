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

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Provision Dynamo DB

    // product Table
    this.productTable = this.createProductTable();

    // basket Table
    this.basketTable = this.createBasketTable();
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
}
