import { productIntetface } from "@/Interfaces/Product.interface"

export interface CartRes {
  status: string,
  numOfCartItems: number,
  cartId: string,
  data: {
    _id: string,
    cartOwner: string,
    products: ProductType[],
    totalCartPrice: number
  }
}



export interface ProductType {
    product:productIntetface,
    count:number,
    price:number,
    _id:string
}