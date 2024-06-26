const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'AchieversIT-All Products',
      path: '/products'
    });
  }).catch((err)=> {
   console.log(err);
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle:`AchieversIT ${product.title}`,
      path: '/products'
    });
  }).catch((err)=> {
    console.log(err);
    throw err
  })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'AchieversIT-Shop',
      path: '/'
    });
  }).catch(err => {
    console.log();
  })
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(products => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart', 
      products: products
    });
  }).catch((err)=> {
    console.log(err);
  })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(product => {
    return req.user.addToCart(product)
  }).then((result)=> {
   console.log(result);
   res.redirect('/cart');
  })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteProductFromCart(prodId).then(product => {
    res.redirect('/cart');
  }).catch((err)=> {
    console.log(err);
  })

};

exports.postOrder = (req, res, next)=> {
  let fetchedCart;
  req.user.addOrder().then(()=> {
    res.redirect('/orders')
  }).catch((err)=> {
    console.log(err);
  })
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then(orders=> {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  }).catch((err)=> {
    console.log(err);
  })
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
