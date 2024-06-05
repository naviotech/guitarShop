import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useCart } from "./hooks/useCart.js"

function App() {
  const { data,cart,addToCart,removeItemCart,removeCart,plusQuantity,removeQuantity, cartTotal } = useCart()
 
  return (
    <>
      <Header
        cart={cart}
        removeItemCart={removeItemCart}
        removeCart={removeCart}
        plusQuantity={plusQuantity}
        removeQuantity={removeQuantity}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {data.map((d)=>(
                <Guitar
                key={d.id}
                id={d.id}
                image={d.image}
                name={d.name}
                price={d.price}
                addToCart={addToCart}
                />
              ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0"> &reg; GuitarLA</p>
          </div>
      </footer>
    </>
  )
}

export default App
