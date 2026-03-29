export interface CartI{
    status : string;
    message : string;
    numOfCartItems : number;
    data : CartDataI;
}
export interface CartDataI{
    _id: string;
    cartOwner: string;
    products: CartProductI[];
    totalCartPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface CartProductI{
    _id: string;
    count: number;
    price: number;
    product: ProductI;
}
export interface ProductI{
    _id: string;
    title: string;
    slug: string;
    imageCover: string;
    quantity: number;
    price: number;
    ratingsAverage: number;
    brand:brandI;
    category:categoryI;
    subcategory:subcategoryI;
}
export interface brandI{
    _id: string;
    name: string;
    slug: string;
    image: string;
}
export interface categoryI{
    _id: string;
    name: string;
    slug: string;
    image: string;
}
export interface subcategoryI{
    _id: string;
    name: string;
    slug: string;
    category:string;
}

