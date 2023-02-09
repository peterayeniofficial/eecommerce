import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export interface EcommerceApiGatewayProps {
  productMicroservice: IFunction;
  bascketMicroservice: IFunction;
}

export class EcommerceApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: EcommerceApiGatewayProps) {
    super(scope, id);

    // Product api gateway
    this.createProductAPI(props.productMicroservice);
    // Product api gateway
    this.createBasketAPI(props.bascketMicroservice);
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
}
