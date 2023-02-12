import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export interface EcommerceApiGatewayProps {
  productMicroservice: IFunction;
  bascketMicroservice: IFunction;
  orderMicroservice: IFunction
}

export class EcommerceApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: EcommerceApiGatewayProps) {
    super(scope, id);

    // Product api gateway
    this.createProductAPI(props.productMicroservice);
    // Basket api gateway
    this.createBasketAPI(props.bascketMicroservice);
    // Orer api gateway
    this.createOrderAPI(props.orderMicroservice)
  }
  private createProductAPI(productMicroservice: IFunction) {
    const productAPIGateway = new LambdaRestApi(this, "productApi", {
      restApiName: "Product Service",
      handler: productMicroservice,
      proxy: false,
    });

    const product = productAPIGateway.root.addResource("product");
    product.addMethod("GET");
    product.addMethod("POST");

    const singleProduct = product.addResource("{id}");
    singleProduct.addMethod("Get");
    singleProduct.addMethod("PUT");
    singleProduct.addMethod("DELETE");
  }

  private createBasketAPI(basketMicroservice: IFunction) {
    const basketAPIGateway = new LambdaRestApi(this, "basketApi", {
      restApiName: "Basket Service",
      handler: basketMicroservice,
      proxy: false,
    });

    const basket = basketAPIGateway.root.addResource("basket");
    basket.addMethod("GET");
    basket.addMethod("POST");

    const singleBasket = basket.addResource("{username}");
    singleBasket.addMethod("Get");
    singleBasket.addMethod("DELETE");

    const basketCheckout = basket.addResource("checkout");
    basketCheckout.addMethod("POST");
  }

  private createOrderAPI(orderMicroservice: IFunction) {
    const orderAPIGateway = new LambdaRestApi(this, "orderApi", {
      restApiName: "Order Service",
      handler: orderMicroservice,
      proxy: false,
    });

    const order = orderAPIGateway.root.addResource("order");
    order.addMethod("GET");

    const singleOrder = order.addResource("{username}");
    singleOrder.addMethod("Get");
    return singleOrder
  }
}
