export interface ShippingAdress {
    name: string
    email: string
    
    city: string
    zip: string
    street: string
}

export class ShippingAddressImpl implements ShippingAdress {

    constructor(name?: string, email?: string, city?: string, zip?: string, street?: string) {
        
        this.name = name || ""
        this.email = email || ""
        this.city = city || ""
        this.zip = zip || ""
        this.street = street || ""

    }
    name: string
    email: string
    city: string
    zip: string
    street: string
}