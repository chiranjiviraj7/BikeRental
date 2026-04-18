namespace BikeRentalAPI.Models
{
    public class RentRequestModel
    {
        public int BikeId { get; set; }
        public string CustName { get; set; }
        public int Duration { get; set; }
    }
}
