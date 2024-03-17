import './App.css'
import storeItems from './assets/json/storeItems.json'
import {StoreItemGrid} from './components/StoreItemGrid'
import { ShoppingManager } from './components/ShoppingManager'
import { ShoppingBasketImpl } from './interfaces/ShoppingBasket'
import { useEffect, useState } from 'react'
import { StoreItem } from './interfaces/StoreItem'

function App() {

  const [basket, setBasket] = useState<ShoppingBasketImpl>(new ShoppingBasketImpl())
  

  const handlerBasketChange = (item: StoreItem) => {
    const newBasket = basket.clone() as ShoppingBasketImpl;
    setBasket( newBasket.addSamples(item.name, 1) );
    newBasket.saveBasket();

  }

  const handlerBasketReset = () => {
    setBasket(basket.clear());
  }

  useEffect(() => {
    setBasket(basket.loadBasket());

  }, [])

    return (
    <>
      <div className="App">

        <ShoppingManager basket={basket} onBasketClear={handlerBasketReset} items={storeItems}></ShoppingManager>
        <StoreItemGrid basket={basket} onBasketChange={handlerBasketChange} items={storeItems} />

      </div>

    </>
  )
}

export default App
