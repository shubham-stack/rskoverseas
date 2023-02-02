/**
* Template Name: Rapid - v4.9.1
* Template URL: https://bootstrapmade.com/rapid-multipurpose-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";
  
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  window.addEventListener('load', () => {
    const data = {
      bangle: {
        name: "Bangle",
        des: "Bangles is of the most important ornament that an Indian women wears. these have always been inseparable part of Indian culture and it is mandatory for newly bride to wear bangles which can be made up from different material like gold, silver ,metals ,Lac glass etc. Overtime these have become more trendier to suit more in contemporary look, Now a day&#39;s these comes in different design and materials having a unique and colorful design full of various bead ,stones are per need. we have a wide range of bangles according to the requirement even we have bangles and other ornament made up of wood which is in very much of trend."
      },
      necklace: {
        name: "Necklace",
        des: "This is Necklace",
      },
      earring: {
        name: "Earring",
        des: "This is Earring",
      },
      oxidisedJewellery: {
        name: "Oxidised Jewellery",
        des: "Oxidized jewellery is created by oxidizing metals like copper and other alloys to provide silvery look to the jewellery, sometime these are also proceed with our silver also by putting them in chemical to provide its black colour. Further these types of jewellery are filled with various precious stones ,bead, to make them look unique and attractive .In India these jewellery are worn by many females as well as men according to their tradition, occasions, festivals etc. we have large varieties of these oxidized jewellery if form of ankle bracelet, ear ring, necklace, ankle bracelet, hand bracelet, nose pins etc.",
      },
      woodenJewelleryBox: {
        name: "Wooden Jewellery Box",
        des: "We have wide range for wooden jewellery boxes according to the requirement of client with different customizable sizes and design. We have boxes for ring, ear rings, Bangles, Necklaces, Ankle bracelet etc. these boxes are purely made up of wood but can be customize according to the demand. We have unique carving process for these boxes to produce unique design. Inner material of these boxes id mainly made up of velvet stuffed with various soft material to avoid any sort of damage to jewellery.",
      },
      idol: {
        name: "God Idols",
        des: "We also deal in various gods idols made up of different metals like brass and copper further made up of stone ,wood working etc. Our firm is based in Mathura Uttar Pradesh which is also known as birth place of lord Krishna so due to this we are specialized in lord Krishna childhood idols. These childhood idols called as Ladoo Gopal or we can say young Krishna( small child) who use to be treated as one. We have a complete combo box of this in which all the accessories are included like his Swinging throne(Asan or Jhula),his small crown(Mukut) , different dresses(Poshak),Rings( Kada), flute(Basuri) etc and many other things. These idols combo available in different sizes according to the requirement of client and its a request if you order this then it should be handled with carefully as they are very holy to us .",
      },
      paperbag: {
        name: "Paper Bags",
        des: "Paper bags are made up of with paper of different characteristics like tensile strength, durability according to the products that are to be carried within it. Most importantly they are recyclable and ecofreindly . We have different varieties of paper bags like brown paper bags what are used to carry vegetables and other groceries followed by bags carrying heavy luggage like clothes and other house hold or decorative materials. these bags are easy customizable for the clients according to their demands like shape, size, color and logos of their companies etc.",
        others: [
            {key: "Length", value: "10×10×4 inches"},
            {key: "height", value: "12×12×8 inches"},
            {key: "breadth", value: "32×45×14 cms"},
        ],
      },
      wheatFlour: {
        name: "Wheat Flour",
        des: "wheat flour is a powder made from grinding of wheat used for human consumption. wheat varieties are called soft or weak if gluten is low and are called hard or strong if gluten is high. hard flour or bread flour is high in gluten with 12% to 14.5 gluten content and its dough gas elastic toughness and holds its shape well once baked. soft flour is comparatively low in gluten and thus result in a loaf with finer crumbly texture." +
        // "<br>"+
        // "<b>There are three types of flour</b><br>" +
        // "1. White flour is made up of endosperm only.<br>" +
        // "2. Brown flour includes some of grains germ and brain while whole grain or whole meal flour is made from entire grain including the bran endosperm.<br>" +
        // "3. Germ flour is made from endosperm and germ, excluding the bran.<br>"+
        "",
        others: [
          {key: "Energy", value: "1418 kj"},
          {key: "Sugar (Carbohydrates)", value: ""},
          {key: "Dietary fiber (Carbohydrates)", value: "72.57 gm"},
          {key: "Fat", value: "1.87 gm"},
          {key: "Protein", value: "13.70 gm"},
          {key: "Thiamine (Vitamin B1)", value: "0.447 mg"},
          {key: "Riboflavin (Vitamin B2)", value: "0.215 mg"},
          {key: "Niacin (Vitamin B3)", value: "6.365 mg"},
          {key: "Pantothenic Acid (Vitamin B5)", value: "1.008 mg"},
          {key: "Vitamin (Vitamin B6)", value: "0.341 mg"},
          {key: "Folate (Vitamin B9)", value: "44 micro gm"},
          {key: "Calcium", value: "34 mg"},
          {key: "Iron (Minerals)", value: "3.88 mg"},
          {key: "Magnesium (Minerals)", value: "138 mg"},
          {key: "Manganese (Minerals)", value: "3.8 mg"},
          {key: "Phosphorus (Minerals)", value: "346 mg"},
          {key: "Potassium (Minerals)", value: "405 mg"},
          {key: "Sodium (Minerals)", value: "5 mg"},
          {key: "Zinc (Minerals)", value: "2.93 mg"},
        ]
      },
      pearlMillet: {
        name: "Pearl Millet",
        des: "Pearl millet commonly known as bajra is a profoundly nutritious easy to digest cereal grain . being non glutinous in nature makes it a healthy option for people with gluten allergy and celiac diseases. they are power packed with carbohydrates ,amino acids antioxidants, multiple vitamin like thiamine, beta carotene and minerals like iron, zinc, phosphorus, magnesium and zinc."+
        // "<br>"+
        // "<b>How to consume it</b><br>"+
        // "Pearl millet or bajra can be found in various forms for daily consumption . you can use it a s flour to make flat bread or Dosa, grains to make porridge, processed grains as poha or Upma for breakfast and ready to eat snacks like millet or multigrain cookies. the enormous health benefits of bajra make it a perfect super food ,optimum for regular consumption by all . it can also be combine to your favorite millet recipe with protein rich dishes containing lentils , cottage cheese, soya chunks, smoothie or salsa to make a perfect breakfast platter of recommended balanced diet."+
        "",
        others: [
          {key: "Protein", value: "10.96 gm"},
          {key: "Dietary fiber", value: "11.49 gm"},
          {key: "Fat content", value: "5.43 gm"},
          {key: "Carbohydrates", value: "61.78 gm"},
          {key: "Energy", value: "1456 kj"},
        ]
      },
      americanDiamond: {
        name: "American Diamond",
        des: "These are one of the uniquely designed jewelry which are mainly worn by the women throughout every country these come in large varieties too. Our jewellery is curated with handpicked precious materials giving off the alluring shine one needs to add to the outfit. The different precious stones and materials are brought together to bring out a cohesive design that one can embrace according to the demand of the occasion. There’s a vast variety of jewellery designs which you should have in your jewellery collection. Some for everyday usual, office wear, traditional wear, festive wear and last but not least party wear collection. Every woman should have bits and pieces of something or the other in her jewellery collection."
      },
      fashion: {
        name: "Fashion",
        des: "It is one the most important part of every women life specially Indian women as these are worn by them in different manner like various occasion, wedding, parties etc that's why its range is enormous .These jewellery comes in various range like necklaces, nose rings, ear rings, anklets, anklets rings ,small pendant, etc. we have a large collection of these products with wide range. We have many varieties of these products worn occasionally according to need and we always keep varieties according to market demand that is these jewellery can be worn by women throughout every countries ."
      },
      oxidised: {
        name: "Oxidised Jewellery",
        des: "Oxidized jewellery is created by oxidizing metals like copper and other alloys to provide silvery look to the jewellery, sometime these are also proceed with our silver also by putting them in chemical to provide its black colour. Further these types of jewellery are filled with various precious stones ,bead, to make them look unique and attractive .In India these jewellery are worn by many females as well as men according to their tradition, occasions, festivals etc. we have large varieties of these oxidized jewellery if form of ankle bracelet, ear ring, necklace, ankle bracelet, hand bracelet, nose pins etc."
      }

    }

    const path = sessionStorage.getItem("productImage");
    const type = path.substring(0, path.indexOf('/'));

    let x1 = document.getElementById("image_id");
    const div =  document.createElement('div');
    div.className = "swiper-slide";
    const img =  document.createElement('img');
    img.src = "assets/img/portfolio/" + path + ".jpg";
    img.alt = "";
    div.appendChild(img);
    x1.appendChild(div);
    
    let x2 = document.getElementById("des_id");
    const node =  document.createTextNode(data[type].des);
    x2.appendChild(node);
    
    
    let x3 = document.getElementById("info_id");
    const li1 =  document.createElement('li');
    const cat = document.createTextNode('Category: ')
    const span =  document.createElement('span');
    span.style.cssText = "font-weight: bold";
    span.appendChild(cat);
    li1.appendChild(span);
    li1.appendChild(document.createTextNode(data[type].name));
    x3.appendChild(li1);
    data[type].others.forEach((v) => {
      const li1 =  document.createElement('li');
      const cat = document.createTextNode(v.key + ": ")
      const span =  document.createElement('span');
      span.style.cssText = "font-weight: bold";
      span.appendChild(cat);
      li1.appendChild(span);
      li1.appendChild(document.createTextNode(v.value));
      x3.appendChild(li1);
    });
    
  

  });

  window.addEventListener('load', () => {
    let x = document.getElementById("products_container");
    
    // const div1 =  document.createElement('div');
    // div.className = "col-lg-4 col-md-6 portfolio-item filter-cat1";
    // const div2 =  document.createElement('div');
    // div.className = "portfolio-wrap";
    // const img =  document.createElement('img');
    // img.src = "assets/img/portfolio/" + sessionStorage.getItem("productImage") + ".jpg";
    // img.className = "img-fluid";
    // img.alt = "";
    // const div3 =  document.createElement('div');
    // div.className = "portfolio-info";
    // const heading =  document.createElement('h4');
    // const anchor1 =  document.createElement('a');
    // anchor1.onclick = "";
    // anchor1.href = "../portfolio-details.html";
    // const div =  document.createElement('div');
    // div.className = "col-lg-4 col-md-6 portfolio-item filter-cat1";
    // div.appendChild(img);
    // x.appendChild(div);
    
    console.log("pre-append");
    // const div =  document.createElement('div');
    // let html = '' +
    // '<div class="col-lg-4 col-md-6 portfolio-item filter-cat1">' +
    //   '<div class="portfolio-wrap">' +
    //     '<img src="./assets/img/portfolio/cat1/bangle1.jpg" class="img-fluid" alt="">' +
    //     '<div class="portfolio-info">' +
    //       '<h4><a onclick=\'setImageData("cat1/bangle1")\' href="./portfolio-details.html">Bangle 1</a></h4>' +
    //       '<p>It is a Precious bangle</p>' +
    //       '<div>' +
    //         '<a href="./assets/img/portfolio/cat1/bangle1.jpg" data-gallery="portfolioGallery ' + 
    //           'title="Bangle 1" class="link-preview portfolio-lightbox"><i class="bi bi-plus"></i></a>'+
    //         '<a href="./portfolio-details.html" class="link-details" title="More Details"><i class="bi bi-link"></i></a>'+
    //       '</div>'+
    //     '</div>'+
    //   '</div>'+
    // '</div>';
    // x.innerHTML += html;
    console.log("post-append");
  });
   
  
  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()