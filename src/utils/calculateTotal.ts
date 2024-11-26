function totalVenuePrice(
  dateFrom: string,
  dateTo: string,
  price: number
): number {
  const bookingStart = new Date(dateFrom);
  const bookingEnd = new Date(dateTo);
  const timeDifference = bookingEnd.getTime() - bookingStart.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference * parseFloat(price.toFixed(2));
}

export default totalVenuePrice;
