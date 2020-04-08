const add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};
const del = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if(find.quantity===1){
    cart.contents.splice(cart.contents.indexOf(find), 1)
  }else {
    find.quantity +=req.body.quantity;
  }
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  del,
};
