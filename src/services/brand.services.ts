
export async function getAllBrands() {
    
const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
         }
        })
        const data = await response.json();
        return data;
}