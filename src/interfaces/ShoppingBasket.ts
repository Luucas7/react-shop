
import { StoreItem } from './StoreItem'
import { ShippingAdress, ShippingAddressImpl } from './ShippingAddress'
// StoreItem name
type StoreItemReference = string

export interface ShoppingBasket {
    items : Map<StoreItemReference, number>
    address: ShippingAdress
    addSamples(item: StoreItemReference, n: number): ShoppingBasket // to add n samples (n can be negative)
    removeItem(item: StoreItemReference): ShoppingBasket // to remove the item from the basket
    clear(): ShoppingBasket // to remove all the items from the basket
    getSamples(item: StoreItemReference) : number // return the number of samples for this reference
    getAllItems(): [StoreItemReference, number][] // return all the items in the basket with the number of samples
    clone(): ShoppingBasket
    saveBasket(): void
    loadBasket(): ShoppingBasket
    computeOrderAmount(items: StoreItem[]): number
}

export class ShoppingBasketImpl implements ShoppingBasket{
    items: Map<string, number>
    address: ShippingAdress

    constructor(map?: Map<string, number>) {
        this.items = new Map(map);
        this.address = new ShippingAddressImpl()
    }


    computeOrderAmount(items: StoreItem[]): number {
        let amount = 0

        for (const item of this.items.entries()) {

            
            const itemi = items.find(i => i.name === item[0]) as StoreItem;
            const discount = itemi.discount !== undefined ? itemi.discount : 0
            amount += (itemi.price - discount) * item[1]  
            

        }

        amount = parseFloat(amount.toFixed(2));

        return amount
    }

    saveBasket(): void {
        const itemsArray = Array.from(this.items.entries());
        localStorage.setItem("basket", JSON.stringify(itemsArray));
    }

    loadBasket(): ShoppingBasket {
        try {
            const itemsArray = JSON.parse(localStorage.getItem("basket") || "[]") as [string, number][];
            const items = new Map(itemsArray);
            return new ShoppingBasketImpl(items);
        } catch (e) {
            console.error('Error loading basket', e)
        }
        return new ShoppingBasketImpl()
    }

    addSamples(item: string, n: number): ShoppingBasket {
        console.log('addSamples', item, n);
        
        if (this.items.has(item)) {
            this.items.set(item, this.items.get(item) + 1)
        } else {
            this.items.set(item, n)
        }
        return this
    }
    removeItem(item: string): ShoppingBasket {
        this.items.delete(item)
        return this
    }
    clear(): ShoppingBasket {
        return new ShoppingBasketImpl()
    }
    getSamples(item: string): number {
        return this.items.get(item) || 0
    }
    getAllItems(): [string, number][] {
        return Array.from(this.items.entries())}

    clone(): ShoppingBasket {
        const newBasket = new ShoppingBasketImpl(this.items)
        return newBasket
    }
}

export const shoppingBasket = new ShoppingBasketImpl()

