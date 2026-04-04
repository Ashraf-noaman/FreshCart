

export async function getAllProducts(catId?:string) {
    
const base = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

const url = catId ? `${process.env.NEXT_PUBLIC_BASE_URL}/products?category[in]=${catId}` : base;

    const response = await fetch(url,
        {
        method:"GET",
        headers:{
           "content-type":"application/json"
        }
    })
    const responseDate = await response.json();
    return responseDate;
}