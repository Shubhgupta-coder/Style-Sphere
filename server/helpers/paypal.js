const paypal = require('paypal-rest-sdk');


paypal.configure({
    mode:'sandbox',
    client_id:'Ac_D6k7RZRoGErq2uUZ1eiAD7XjIB3BAkXnacUVERn39xF8nTL8EWpaaHE7TbkdMFsJiQzv_9s-Wr3Q4',
    client_secret:'EJhI6Km1GzbVWMVR5pF-yEtYaDdVwdroo-jCx83YXihbNp8SwFyOJGlRgNS-3osNjP2GcUmdG0URywsG'
})

module.exports=paypal;