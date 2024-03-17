import { ShoppingBasket } from "../interfaces/ShoppingBasket";
import { StoreItem } from "../interfaces/StoreItem";
import ShippingAddressManager from "./ShippingAddressManager";


export const ShoppingManager = (props: { basket: ShoppingBasket, onBasketClear: () => void, items: StoreItem[] }) => {
    return (
        <>
        <div className="shopping-manager col-md-4">
            <div className="clear-basket">
                <button onClick={props.onBasketClear}>Clear basket</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Quantité</th>
                        <th>Nom</th>
                        <th>Prix unitaire</th>
                        <th>Prix total</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        Array.from(props.basket.items.entries()).map(([item, quantity], index) => {

                            const itemi = props.items.find(i => i.name === item) as StoreItem;
                            const discount = itemi.discount ? itemi.price / 100 * itemi.discount: 0;
                            
                            return (
                                <tr key={index}>
                                    <td>{quantity}</td>
                                    <td>{itemi.name}</td>
                                    <td>{(itemi.price - discount).toFixed(2)} €</td>
                                    <td>
                                        {((itemi.price - discount )*quantity).toFixed(2)   } €
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="total">
                <p>Total: {props.basket.computeOrderAmount(props.items)} €</p>
            </div>
            <div className="shipping-address">
                <h2>Shipping address</h2>
                <ShippingAddressManager />
            </div>
        </div>
        </>
    )
}