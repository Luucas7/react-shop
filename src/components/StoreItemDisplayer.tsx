import { StoreItem } from "../interfaces/StoreItem";

export const StoreItemDisplayer = (props : {item: StoreItem, onAdd: (item: StoreItem) => void}) => {

    return (
        
            <div className={props.item.discount !== undefined ?  "discount-item grid-item" : "normal-item grid-item"}>


                <div className="item-image">
                { props.item.picture !== undefined ? <img src={"src/public/pictures/"+props.item.picture} alt="Beautiful picture of the item" /> : <div></div>}
                </div>

                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>
                <p className='price'>{props.item.price}€</p>
                {props.item.discount !== undefined ? <p className='discount'>{
                (props.item.price - (props.item.price / 100 * props.item.discount)).toFixed(2)
                }€</p> : <></>}
                <button onClick={() => props.onAdd(props.item)}>Add to basket</button>
                {}
            </div>
        
    )



}