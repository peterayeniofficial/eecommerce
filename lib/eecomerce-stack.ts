import { EcommerceApiGateway } from "./apigateway";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { EcommerceDatabase } from "./database";
import { EcommerceMicroservice } from "./microservices";

export class EecomerceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const database = new EcommerceDatabase(this, "Database");
    const microServices = new EcommerceMicroservice(this, "Microservices", {
      productTable: database.productTable,
      basketTable: database.basketTable,
    });

    const apiGateway = new EcommerceApiGateway(this, "ApiGateway", {
      productMicroservice: microServices.productMicroservice,
    });
  }
}
