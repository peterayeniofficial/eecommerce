import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface EcommerceApiGatewayProps {
    productMicroservice: IFunction
}

export class EcommerceApiGateway extends Construct {
  constructor(scope: Construct, id: string, props: EcommerceApiGatewayProps) {
    super(scope, id);

    const apgw = new LambdaRestApi(this, 'productApi', {
        restApiName: 'Product Service',
        handler: props.productMicroservice,
        proxy: false
      })
  
      const product = apgw.root.addResource('product')
      product.addMethod('GET')
      product.addMethod('POST')
  
      const singleProduct = product.addResource('{id}')
      singleProduct.addMethod('Get')
      singleProduct.addMethod('PUT')
      singleProduct.addMethod('DELETE')
  
  }
}