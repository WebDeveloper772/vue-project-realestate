import store from '../store'
export default function getData() {
  let pricing = []
  let imagesBig = []
  let adresses = []
  let shortDesc = []
  let postTown = []
  let fullAdress = []
  const axios = require('axios')

  axios({
    method: 'get',
    url:
      'http://api.zoopla.co.uk/api/v1/property_listings.json?area=london&api_key=nnc2mfhmmbngxyvgpmqy86nz',
    responseType: 'application/json',
  })
    .then(function (response) {
      console.log(response)
      for (let i = 0; i < response.data.listing.length; i++) {
        pricing.push(response.data.listing[i].price)
        imagesBig.push(response.data.listing[i].image_645_430_url)
        adresses.push(response.data.listing[i].street_name)
        shortDesc.push(response.data.listing[i].short_description)
        postTown.push(response.data.listing[i].post_town)
        fullAdress.push(response.data.listing[i].displayable_address)
      }
      console.log(shortDesc, pricing, adresses, imagesBig)
      store.commit('allListings', {
        listing: response.data.listing.length,
        price: pricing,
        images: imagesBig,
        adress: adresses,
        desc: shortDesc,
        fullAdress,
        postTown,
      })
    })
    .catch(error => {
      console.log(error)
    })
}