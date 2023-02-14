import { IFunction } from "aws-cdk-lib/aws-lambda";
import { IQueue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Duration } from "aws-cdk-lib";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

interface EcommerceQuequeProps {
  consumer: IFunction;
}
export class EcommerceQueque extends Construct {
  public readonly orderQueue: IQueue;

  constructor(scope: Construct, id: string, props: EcommerceQuequeProps) {
    super(scope, id);

    // queue
    this.orderQueue = new Queue(this, "OrderQueue", {
      queueName: "OrderQueue",
      visibilityTimeout: Duration.seconds(30),
    });

    props.consumer.addEventSource(
      new SqsEventSource(this.orderQueue, {
        batchSize: 1,
      })
    );
  }
}
