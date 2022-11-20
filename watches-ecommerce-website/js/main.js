/*============ NAV MENU (OPEN & CLOSE) ============*/
let navMenu = document.querySelector("#nav__menu");
let navToggle = document.querySelector("#nav__toggle");
let navClose = document.querySelector("#nav__close");
let navItems = document.querySelectorAll(".nav__item");
navToggle.addEventListener("click", () => {
  navMenu.classList.add("opened");
});
navClose.addEventListener("click", () => {
  navMenu.classList.remove("opened");
});
navItems.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    navMenu.classList.remove("opened");
  });
});



/*============ CHANGE BACKGROUND HEADER ============*/
function scrollHeader() {
  let header = document.querySelector("#header");

  if (scrollY >= 50) {
    header.classList.add("scroll-header");
  }

  if (scrollY < 50) {
    header.classList.remove("scroll-header");
  }
}
window.addEventListener("scroll", scrollHeader);



/*============ TESTIMONIAL SWIPER ============*/
const testimonialSwiper = new Swiper('.testimonial__swiper', {
  loop: 'true',
  spaceBetween: 30,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



/*============ NEW SWIPER ============*/
const newSwiper = new Swiper('.new__swiper', {
  loop: 'true',
  spaceBetween: 25,

  breakpoints: {
    576: {
      slidesPerView: 2,
    },

    768: {
      slidesPerView: 3,
    },

    1024: {
      slidesPerView: 4,
    }
  }
});




/*============ SCROLL SECTION ACTIVE LINK ============*/
let sections = document.querySelectorAll('section[id]')
function scrollActive() {
  sections.forEach(section => {
    let sectionTop = section.offsetTop - 58
    let sectionBottom = sectionTop + section.offsetHeight
    let sectionId = section.getAttribute('id')
    let sectionNavLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`)

    if(scrollY > sectionTop && scrollY <= sectionBottom) {
      sectionNavLink.classList.add('active__link')
    }
    else {
      sectionNavLink.classList.remove('active__link')
    }

  })
}
window.addEventListener('scroll',scrollActive)




/*============ SCROLLUP ============*/
let scrollUp = document.querySelector('.scrollup')
window.onscroll = ()=> {
  scrollY > 400 ? scrollUp.classList.add('show') : scrollUp.classList.remove('show')
}




/*============ THEME CHANGER ============*/
let themeButton = document.querySelector('#theme__button')
let pageTheme = localStorage.getItem('pageTheme')
let body = document.body
if(pageTheme !== null && pageTheme === 'dark') {
    body.setAttribute('theme','dark')
    themeButton.classList.remove('bx-moon')
    themeButton.classList.add('bx-sun')
}
function themeFunction(theme,previousIcon,currentIcon) {
  body.setAttribute('theme',theme)
  themeButton.classList.remove(previousIcon)
  themeButton.classList.add(currentIcon)
  localStorage.setItem('pageTheme',theme)
  localStorage.setItem('themeIcon',currentIcon)
}
themeButton.onclick = ()=> {
  if(body.getAttribute('theme') === 'light') {
    themeFunction('dark','bx-moon','bx-sun')
  }
  else {
    themeFunction('light','bx-sun','bx-moon')
  }
}




/*============ CART (CLOSE & OPEN) ============*/
let cartToggle = document.querySelector('#nav__cart__shop')
let cart = document.querySelector('#cart')
let cartClose = document.querySelector('#cart__close')
cartToggle.addEventListener('click',()=> {
  cart.classList.add('open')
  body.style.overflow = 'hidden'
})
cartClose.addEventListener('click',()=> {
  cart.classList.remove('open')
  body.style.overflow = 'visible'
})






/*====================== ADDING PRODUCTS TO CART ======================*/
let featuredItems = document.querySelectorAll('.featured__card')
let cartContainer = document.querySelector('.cart__container')
let cartAttribute = localStorage.getItem('cartAttribute')

let localObject = localStorage.getItem('products')
localObject = JSON.parse(localObject)


/* FUNCTION FOR : SETTING EVENTS FOR (PLUS , MINUS & REMOVE) BUTTONS IN RELOADS */
function productsEvents() {
  let cards = document.querySelectorAll('.cart__card')

  cards.forEach((card)=> {
    let plusButton = card.querySelector('.cart__plus')
    let minusButton = card.querySelector('.cart__minus')
    let removeButton = card.querySelector('.cart__remove')
    let numberContainer = card.querySelector('.cart__number')
    let titleDashed = titleMaker(card.querySelector('.cart__card__title').innerHTML)

    plusButton.addEventListener('click',()=> {
      localObject = localStorage.getItem('products')
      localObject = JSON.parse(localObject)

      titles = Object.keys(localObject)
      contents = Object.values(localObject)

      let index = titles.indexOf(titleDashed)
      
      numberContainer.innerHTML++

      delete localObject[titleDashed]
    
      localObject[titleDashed] = {
        title: contents[index].title,
        img: contents[index].img,
        price: contents[index].price,
        num: contents[index].num + 1,
      }

      localStorage.setItem('products',JSON.stringify(localObject))
    })

    minusButton.addEventListener('click',()=> {
      localObject = localStorage.getItem('products')
      localObject = JSON.parse(localObject)

      titles = Object.keys(localObject)
      contents = Object.values(localObject)

      let index = titles.indexOf(titleDashed)
      
      let numberValue = contents[index].num 

      if(numberValue === 1) {
        contents.splice(index,1)

        if(contents.length !== 0) {
          delete localObject[titleDashed]
          localStorage.setItem('products',JSON.stringify(localObject))

          cards = document.querySelectorAll('.cart__card')

          card.remove()
        }

        else {
          localStorage.removeItem('products')

          let emptyStructure = 
          `
          <div class="empty__container">
            <i class='bx bxs-shopping-bag'></i>
            <h1>Your cart is empty</h1>
            <p>Add something to make me happy :)</p>
          </div>
          `

          cartContainer.innerHTML = ''
          cartContainer.innerHTML = emptyStructure
          cartContainer.setAttribute('cartAttribute','empty')
          localStorage.setItem('cartAttribute','empty')

        }

      }
      
      else {
        numberContainer.innerHTML--

        delete localObject[titleDashed]
        
        localObject[titleDashed] = {
          title: contents[index].title,
          img: contents[index].img,
          price: contents[index].price,
          num: contents[index].num - 1,
        }
        
        localStorage.setItem('products',JSON.stringify(localObject))
      }

    })

    removeButton.addEventListener('click',()=> {
      localObject = localStorage.getItem('products')
      localObject = JSON.parse(localObject)

      titles = Object.keys(localObject)
      contents = Object.values(localObject)

      let index = titles.indexOf(titleDashed)
      contents.splice(index,1)

      if(contents.length !== 0) {
        card.remove()
  
        delete localObject[titleDashed]
        localStorage.setItem('products',JSON.stringify(localObject))
      }

      else {  
        localStorage.removeItem('products')

        let emptyStructure = 
        `
        <div class="empty__container">
          <i class='bx bxs-shopping-bag'></i>
          <h1>Your cart is empty</h1>
          <p>Add something to make me happy :)</p>
        </div>
        `
        cartContainer.innerHTML = ''
        cartContainer.innerHTML = emptyStructure

        cartContainer.setAttribute('cartAttribute','empty')
        localStorage.setItem('cartAttribute','empty')
      }



    })

  })
}

/* PUT ITEMS IN CART IN EVERY RELOAD & ADD PRODUCTS EVENTS TO THEM */
if(localObject !== null) {
  console.log('first')
  let titles = Object.keys(localObject)
  let contents = Object.values(localObject)
  cartContainer.innerHTML = ''
  cartContainer.setAttribute('cartAttribute','notempty')

  for (let i = 0 ; i < contents.length ; i++) {
        let structure = `
        <article class="cart__card">
          <div class="cart__box">
            <img src="${contents[i].img}" class="cart__img">
          </div>
      
          <div class="cart__details">
            <h3 class="cart__card__title">${contents[i].title}</h3>
            <p class="cart__price">${contents[i].price}</p>
      
            <div class="cart__amount">
              <span class="cart__minus">
                <i class='bx bx-minus'></i>
              </span>
      
              <span class="cart__number">${contents[i].num}</span>
      
              <span class="cart__plus">
                <i class='bx bx-plus'></i>
              </span>
            </div>
          </div>
      
          <div class="cart__remove">
            <i class='bx bx-trash-alt'></i>
          </div>
        </article>
        `
        cartContainer.innerHTML += structure
  }

  productsEvents()

}


/* FUNCTION FOR : IF TITLE HAS SPACE REPLACE IT WITH UNDERSCORE */
function titleMaker(title) {
  let arr = title.split('')
  let spaceIndex = title.indexOf(' ')
  if(spaceIndex !== -1) {
    arr.splice(spaceIndex,1,'_')
  }
  let newTitle = arr.join('')

  return newTitle
}

/* ALWAYS UPDATE THE ATTRIBUTE IN RELOADS */
if(cartAttribute !== null) {
  cartContainer.setAttribute('cartAttribute',cartAttribute)
}


featuredItems.forEach(item=> {
  /* GET THE CHILDREN ELEMENTS FOR EVERY ITEM */
  let itemTitle = item.querySelector('.featured__title').innerHTML
  let itemTitleDahsed = titleMaker(itemTitle)
  let itemPrice = item.querySelector('.featured__span').innerHTML
  let itemImg = item.querySelector('.featured__img').getAttribute('src')
  let itemButton = item.querySelector('.featured__button')

  /* CREATE THE HTML STRUCTURE FOR THE PRODUCT USING THE CHILDRENDS ABOVE */
  let productStructure = `
  <article class="cart__card">
    <div class="cart__box">
      <img src="${itemImg}" class="cart__img">
    </div>

    <div class="cart__details">
      <h3 class="cart__card__title">${itemTitle}</h3>
      <p class="cart__price">${itemPrice}</p>

      <div class="cart__amount">
        <span class="cart__minus">
          <i class='bx bx-minus'></i>
        </span>

        <span class="cart__number">1</span>

        <span class="cart__plus">
          <i class='bx bx-plus'></i>
        </span>
      </div>
    </div>

    <div class="cart__remove">
      <i class='bx bx-trash-alt'></i>
    </div>
  </article>
  `

  /* THE WORK STARTS WHEN THE ITEM'S BUTTON KI TKLIKA 3LIHA */
  itemButton.addEventListener('click',()=> {

    /* KNMCHIW NJIBO L OBJECT LI 7ATIN FIH L PRODUCTS WITH THEIR DETAILS FROM LOCALSTORAGE */
    let productsObject = localStorage.getItem('products')
    productsObject = JSON.parse(productsObject)


    /* WHEN CART IS EMPTY REMOVE EMPTY CONTAINER & UPDATE ATTRIBUTE */
    /* COULD BE FIRST TIME OR GA3 L PRODUCTS TM7AW */
    if(cartContainer.getAttribute('cartAttribute') === 'empty') {
      console.log('first time only')
      cartContainer.innerHTML = ''
      localStorage.setItem('cartAttribute','notempty')
    }

    /* IF L OBJECT LI FIH L PRODUCTS ALREADY KAYN */
    /* THEN CHECK IF THE CLICKED PRODUCT ALREADY EXIST OR NOT */
    if(productsObject !== null) {

      /* KANCHDO TITLES DYAL GA3 L PRODUCTS LI KYNIN WKN7TOHOM F ARRAY */
      let itemsTitle = Object.keys(productsObject)

      /* KANCHDO CONTENT DYAL GA3 L PRODUCTS LI KYNIN WKN7TOHOM F ARRAY */
      let itemsContent = Object.values(productsObject)


      /* IF CLIKED PRODUCT ALREADY EXIST THEN UPDATE ITS NUMBER IN CART & IN LOCALSTORAGE */
      if(itemsTitle.includes(itemTitleDahsed)) {
        let index = itemsTitle.indexOf(itemTitleDahsed)
        let content = itemsContent[index]
        let productNum = content.num + 1


        /* UPDATE IN LOCALSTORAGE */
        delete productsObject[itemTitleDahsed]

        productsObject[itemTitleDahsed] = {
          title: itemTitle,
          img: itemImg,
          price: itemPrice,
          num: productNum
        }

        localStorage.setItem('products',JSON.stringify(productsObject))


        /* UPDATE IN CART */
        let cards = document.querySelectorAll('.cart__card')

        cards.forEach((card)=> {
          let cartTitle = card.querySelector('.cart__card__title').innerHTML
          let cartNumber = card.querySelector('.cart__number')

          if(cartTitle === itemTitle) {
            cartNumber.innerHTML = productNum
            return
          }
        })
      }

      /* IF CLIKED PRODUCT DOES NOT EXIST THEN CREATE IT & PUSH IT IN LOCALSTORAGE & CART */
      else {
        cartContainer.innerHTML += productStructure
        cartContainer.setAttribute('cart','notempty')

        productsObject[itemTitleDahsed] = {
            title: itemTitle,
            img: itemImg,
            price: itemPrice,
            num: 1
        }

        localStorage.setItem('products',JSON.stringify(productsObject))

        productsEvents()

      }
      
    }

    /* IF L OBJECT LI FIH L PRODUCTS MKYNCH */
    /* COULD BE FIRST TIME OR GA3 L PRODUCTS TM7AW */
    /* THEN CREATE THE PRODUCT & PUSH IT TO CART ALSO SET THE ITEM PAIR IN LOCALSTORAGE & STORE THE PRODUCT IN IT */
    else if (productsObject === null) {
      console.log('third')
      cartContainer.setAttribute('cartAttribute','notempty')
      localStorage.setItem('cartAttribute','notempty')
      cartContainer.innerHTML = ''
      cartContainer.innerHTML += productStructure

      let itemObject = {
        [itemTitleDahsed]: {
          title: itemTitle,
          img: itemImg,
          price: itemPrice,
          num: 1
        }
      }

      localStorage.setItem('products',JSON.stringify(itemObject))


      let plusButton = cartContainer.lastElementChild.querySelector('.cart__plus')
      let minusButton = cartContainer.lastElementChild.querySelector('.cart__minus')
      let numberContainer = cartContainer.lastElementChild.querySelector('.cart__number')
      let removeButton = cartContainer.lastElementChild.querySelector('.cart__remove')
      let titleDashed = titleMaker(cartContainer.lastElementChild.querySelector('.cart__card__title').innerHTML)

      plusButton.addEventListener('click',()=> {
        cartContainer.lastElementChild.classList.add('third')
        console.log('third')
        localObject = localStorage.getItem('products')
        localObject = JSON.parse(localObject)

        titles = Object.keys(localObject)
        contents = Object.values(localObject)

        let index = titles.indexOf(titleDashed)
        
        numberContainer.innerHTML++

        delete localObject[titleDashed]
      
        localObject[titleDashed] = {
          title: contents[index].title,
          img: contents[index].img,
          price: contents[index].price,
          num: contents[index].num + 1,
        }

        localStorage.setItem('products',JSON.stringify(localObject))
      })

      minusButton.addEventListener('click',()=> {
        localObject = localStorage.getItem('products')
        localObject = JSON.parse(localObject)
  
        titles = Object.keys(localObject)
        contents = Object.values(localObject)
  
        let index = titles.indexOf(titleDashed)
        
        let numberValue = contents[index].num 

        if(numberValue === 1) {
          let emptyStructure = 
          `
          <div class="empty__container">
            <i class='bx bxs-shopping-bag'></i>
            <h1>Your cart is empty</h1>
            <p>Add something to make me happy :)</p>
          </div>
          `
          cartContainer.innerHTML = ''
          cartContainer.innerHTML = emptyStructure

          cartContainer.setAttribute('cartAttribute','empty')
          localStorage.setItem('cartAttribute','empty')
          localStorage.removeItem('products')
        }

        else {
          numberContainer.innerHTML--

          delete localObject[titleDashed]
          
          localObject[titleDashed] = {
            title: contents[index].title,
            img: contents[index].img,
            price: contents[index].price,
            num: contents[index].num - 1,
          }
          
          localStorage.setItem('products',JSON.stringify(localObject))
        }

      })

      removeButton.addEventListener('click',()=> {
        localObject = localStorage.getItem('products')
        localObject = JSON.parse(localObject)
  
        localStorage.removeItem('products')

        let emptyStructure = 
        `
        <div class="empty__container">
          <i class='bx bxs-shopping-bag'></i>
          <h1>Your cart is empty</h1>
          <p>Add something to make me happy :)</p>
        </div>
        `
        cartContainer.innerHTML = ''
        cartContainer.innerHTML = emptyStructure

        cartContainer.setAttribute('cartAttribute','empty')
        localStorage.setItem('cartAttribute','empty')
      })

    }
    
  })
})







/*============ SCROLLREVEAL ============*/

let sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 300,
  reset: true,
  opacity: 0
})

sr.reveal('.home__img',{origin:'bottom', distance:'90px'})
sr.reveal('.home__title, .newsletter__container, .footer__details')
sr.reveal('.home__social',{origin: 'right'})
sr.reveal('.home__description, .footer__rights',{delay:'400'})
sr.reveal('.home__price',{delay:'500'})
sr.reveal('.home__btns',{delay:'600'})
sr.reveal('.featured__container, .new__container',{origin:'bottom'})
sr.reveal('.products__card',{interval:200})
sr.reveal('.testimonial__swiper',{origin:'left'})
sr.reveal('.testimonial__images',{origin:'right'})



