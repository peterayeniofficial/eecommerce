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
}

export class EcommerceMicroservice extends Construct {
  public readonly productMicroservice: NodejsFunction;

  constructor(scope: Construct, id: string, props: EcommerceMicroserviceProps) {
    super(scope, id);
    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ["aws-sdk"],
      },
      environment: {
        PRIMARY_KEY: "id",
        DYNAMODB_TABLE_NAME: props.productTable.tableName,
      },
      runtime: Runtime.NODEJS_14_X,
    };

    // Provision LambdaFunction
    const productFunction = new NodejsFunction(this, "productLambdaFunction", {
      entry: join(__dirname, `/../src/product/index.js`),
      ...nodeJsFunctionProps,
    });

    // grant access to LambdaFunction
    props.productTable.grantReadWriteData(productFunction);
    this.productMicroservice = productFunction;
  }
}
