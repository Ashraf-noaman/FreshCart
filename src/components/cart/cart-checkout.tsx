"use client"
import { cashCheckOut } from "@/actions/cart.action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartContext } from "@/provider/cart-provider"
import { checkOutSchema, CheckOutTypeSchema } from "@/schemas/check.schemas"
import { ShippDAtaI } from "@/types/cart.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Spinner } from '@/components/ui/spinner';


export function CartCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {cartId,getCartData} = useContext(CartContext);
     const form = useForm({
      resolver:zodResolver(checkOutSchema),
      defaultValues:{
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
        postalCode: ""
      }
      }
    });
async function handelCheckOut (data: { shippingAddress: ShippDAtaI }) {
    try{
      setIsLoading(true);
      const response = await cashCheckOut(data.shippingAddress, cartId);
      getCartData();
      toast.success(response.message);
      router.push("/");
      
    }catch(error){
      toast.error((error as Error).message || "An error occurred during checkout");
    }finally{
      setIsLoading(false);
    }
    
  }
  return (
    <Dialog >
      <form >
        <DialogTrigger asChild>
          <Button variant="outline" className ="cursor-pointer w-full transition duration-300 h-10 flex mx-auto items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold">Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Cart Payment</DialogTitle>
            <DialogDescription>
              Make sure to fill all the required fields before submitting.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handelCheckOut)} className='space-y-7'>
            
          <Controller  
              name="shippingAddress.details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Details
                  </FieldLabel>
                  <Input
                  type='text'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Location Details"
                    autoComplete="off"
                    className="h-12 border border-gray-300 shadow-none 
                    focus:border-green-500 focus:outline-none focus:ring-0 
                    focus-visible:border-green-500 focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />  
          <Controller  
              name="shippingAddress.phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Phone
                  </FieldLabel>
                  <Input
                  type='tel'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Phone Number"
                    autoComplete="off"
                    className="h-12 border border-gray-300 shadow-none 
                    focus:border-green-500 focus:outline-none focus:ring-0 
                    focus-visible:border-green-500 focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />  
          <Controller  
              name="shippingAddress.city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    City
                  </FieldLabel>
                  <Input
                  type='text'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your City"
                    autoComplete="off"
                    className="h-12 border border-gray-300 shadow-none 
                    focus:border-green-500 focus:outline-none focus:ring-0 
                    focus-visible:border-green-500 focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />  
          <Controller  
              name="shippingAddress.postalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Postal Code
                  </FieldLabel>
                  <Input
                  type='number'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Postal Code"
                    autoComplete="off"
                    className="h-12 border border-gray-300 shadow-none 
                    focus:border-green-500 focus:outline-none focus:ring-0 
                    focus-visible:border-green-500 focus-visible:ring-0"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />  
            <Button className="bg-green-600 text-white cursor-pointer flex items-center h-10 justify-center gap-3 w-full px-4 py-2 border rounded-lg shadow-sm hover:bg-green-700 transition" type="submit">
              {isLoading ? 
              <>
              <Spinner></Spinner> <span>processing...</span>
              </>
              : "CheckOut"}
              
              </Button>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  )
}
