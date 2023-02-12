import { EcommerceApiGateway } from "./apigateway";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { EcommerceDatabase } from "./database";
import { EcommerceMicroservice } from "./microservices";
import { EccommerceEventBus } from "./eventbus";

export class EecomerceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const database = new EcommerceDatabase(this, "Database");
    const microServices = new EcommerceMicroservice(this, "Microservices", {
      productTable: database.productTable,
      basketTable: database.basketTable,
      orderTable: database.orderTable
    });

    const apiGateway = new EcommerceApiGateway(this, "ApiGateway", {
      productMicroservice: microServices.productMicroservice,
      bascketMicroservice: microServices.basketMicroservice,
      orderMicroservice: microServices.orderMicroservice
    });

    const eventBus = new EccommerceEventBus(this, "EventBus", {
      publisherFunction: microServices.basketMicroservice,
      targetFunction: microServices.orderMicroservice
    })


  }
}
