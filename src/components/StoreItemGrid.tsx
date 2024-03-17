import { useState } from "react";
import { StoreItem } from "../interfaces/StoreItem"
import { StoreItemDisplayer } from "./StoreItemDisplayer"
import { ShoppingBasket } from "../interfaces/ShoppingBasket";

export const StoreItemGrid = (props: {basket:ShoppingBasket, onBasketChange: (item: StoreItem) => void, items: StoreItem[]}) => {


    const [search, setSearch] = useState('');
    
    const handleSearch = (e : any) => {
        setSearch(e.target.value);
    }

    const filtered = props.items.filter( item => {
        return item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    });


    return (
        <>

        <input type="text" placeholder="Search..." onChange={ (e) => handleSearch(e)}/>
        <div className="store-item-grid">
        {
        filtered.map((item: StoreItem, index: number) => {

          {return <StoreItemDisplayer item={item} key={index} onAdd={props.onBasketChange} />}

        })
        }

        </div>
        </>
    )
}