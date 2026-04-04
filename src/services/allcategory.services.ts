

export async function getAllCategory() {
    
const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
         }
        })
        const data = await response.json();
        return data;
}