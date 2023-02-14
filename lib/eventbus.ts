import { IQueue } from 'aws-cdk-lib/aws-sqs';
import { EventBus, Rule } from "aws-cdk-lib/aws-events";
import { LambdaFunction, SqsQueue } from "aws-cdk-lib/aws-events-targets";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface EccommerceEventBusProps {
  publisherFunction: IFunction;
  // targetFunction: IFunction;
  targetQueue: IQueue
}

export class EccommerceEventBus extends Construct {
  constructor(scope: Construct, id: string, props: EccommerceEventBusProps) {
    super(scope, id);

    // eventbus
    const bus = new EventBus(this, "EcommerceEventBus", {
      eventBusName: "EcommerceEventBus",
    });

    const checkoutBasketRule = new Rule(this, "CheckoutBasketRule", {
      eventBus: bus,
      enabled: true,
      description: "When Basket microservice checkout the basket",
      eventPattern: {
        source: ["com.eco.basket.checkoutbasket"],
        detailType: ["CheckoutBasket"],
      },
      ruleName: "CheckoutBasketRule",
    });

    // checkoutBasketRule.addTarget(new LambdaFunction(props.targetFunction));
    checkoutBasketRule.addTarget(new SqsQueue(props.targetQueue));
    bus.grantPutEventsTo(props.publisherFunction)
  }
}
