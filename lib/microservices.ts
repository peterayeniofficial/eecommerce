import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export interface EcommerceMicroserviceProps {
  productTable: ITable;
  basketTable: ITable;
}

export class EcommerceMicroservice extends Construct {
  public readonly productMicroservice: NodejsFunction;
  public readonly basketMicroservice: NodejsFunction;

  constructor(scope: Construct, id: string, props: EcommerceMicroserviceProps) {
    super(scope, id);

    // Product microservices
    this.productMicroservice = this.createProductFunction(props.productTable);

    // Basket Microservices
    this.basketMicroservice = this.createBasketFunction(props.basketTable);

    // grant access to LambdaFunction
    props.productTable.grantReadWriteData(this.productMicroservice);
    props.basketTable.grantReadWriteData(this.basketMicroservice)
  }

  private createProductFunction(productTable: ITable): NodejsFunction {
    const productFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        PRIMARY_KEY: "id",
        DYNAMODB_TABLE_NAME: productTable.tableName,
      },
      runtime: Runtime.NODEJS_14_X,
    };

    // Provision LambdaFunction
    const productFunction = new NodejsFunction(this, "productLambdaFunction", {
      entry: join(__dirname, `/../src/product/index.js`),
      ...productFunctionProps,
    });

    return productFunction;
  }

  private createBasketFunction(productTable: ITable): NodejsFunction {
    const basketFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        PRIMARY_KEY: "id",
        DYNAMODB_TABLE_NAME: productTable.tableName,
      },
      runtime: Runtime.NODEJS_14_X,
    };

    // Provision LambdaFunction
    const basketFunction = new NodejsFunction(this, "productLambdaFunction", {
      entry: join(__dirname, `/../src/product/index.js`),
      ...basketFunctionProps,
    });

    return basketFunction;
  }
}
