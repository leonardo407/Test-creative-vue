export default function(apartmentList) {
  apartmentList.forEach(apartment => {
    apartment.isLike = false
  })

  return apartmentList
}