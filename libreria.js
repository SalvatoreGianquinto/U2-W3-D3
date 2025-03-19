// Recupero i dati dall'API
const library = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore")
      }
    })
    // gestisco i dati ricevuti
    .then((books) => {
      console.log("Dati", books)
      const container = document.getElementById("books-container")

      // Mi creo le card
      books.forEach((book) => {
        const col = document.createElement("div")
        col.setAttribute("class", "col")

        const card = document.createElement("div")
        card.setAttribute("class", "card h-100")

        const img = document.createElement("img")
        img.setAttribute("src", book.img)
        img.setAttribute("class", "card-img-top")
        img.setAttribute("alt", `Copertina di ${book.title}`)

        const cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")

        const title = document.createElement("h5")
        title.setAttribute("class", "card-title")
        title.textContent = book.title

        const price = document.createElement("p")
        price.setAttribute("class", "card-text")
        price.textContent = `Prezzo: ${book.price}€`

        // Ho creato il bottone "Compra ora"
        const buyButton = document.createElement("button")
        buyButton.setAttribute("class", "btn btn-success mt-2 me-2")
        buyButton.setAttribute("type", "button")
        buyButton.textContent = "Compra ora"
        buyButton.addEventListener("click", () => addToCart(book))

        // Ho creato il bottone "Scarta"
        const discardButton = document.createElement("button")
        discardButton.setAttribute("class", "btn btn-danger mt-2")
        discardButton.setAttribute("type", "button")
        discardButton.textContent = "Scarta"
        discardButton.addEventListener("click", () => col.remove())

        // Inserisco gli elementi nelle card
        cardBody.appendChild(title)
        cardBody.appendChild(price)
        cardBody.appendChild(buyButton)
        cardBody.appendChild(discardButton)
        card.appendChild(img)
        card.appendChild(cardBody)
        col.appendChild(card)
        container.appendChild(col)
      })
    })
    .catch((err) => {
      console.log("NOO", err)
    })
}

// Questa let mi serve per la gestione del carrello
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Funzione per aggiungere il libro al carrello
const addToCart = (book) => {
  const bookData = { title: book.title, price: parseFloat(book.price) }
  cart.push(bookData)
  localStorage.setItem("cart", JSON.stringify(cart))
  renderCart()
}

// Funzione per rimuoverlo dal carrello
const removeFromCart = (index) => {
  cart.splice(index, 1)
  localStorage.setItem("cart", JSON.stringify(cart))
  renderCart()
}

// Funzione per visualizzare il carrello,
// ho anche aggiunto la possibilità di fare il totale di tutti i prodotti nel carrello
// in modo che un IPOTETICO cliente possa vedere il totale direttamente da li'
// e ovviamente anche il tasto per rimuovere il prodotto dal carrello
const renderCart = () => {
  const cartList = document.getElementById("cart-list")
  const cartTotal = document.getElementById("cart-total")
  cartList.innerHTML = ""
  let total = 0

  cart.forEach((item, index) => {
    if (item.title && typeof item.price === "number") {
      const li = document.createElement("li")
      li.className =
        "list-group-item d-flex justify-content-between align-items-center"
      li.textContent = `${item.title} - ${item.price.toFixed(2)}€`

      const removeButton = document.createElement("button")
      removeButton.className = "btn btn-danger btn-sm"
      removeButton.textContent = "Rimuovi"
      removeButton.onclick = () => removeFromCart(index)

      li.appendChild(removeButton)
      cartList.appendChild(li)

      total += item.price
    }
  })

  cartTotal.textContent = total.toFixed(2)
}

// E per finire qui mi sono chimato le funzioni
library()
renderCart()
