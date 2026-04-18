namespace BikeRentalAPI.Models
{
    public class RentalHistoryDto
    {
        public string CustName { get; set; }
        public string CustPhNo { get; set; }
        public int Duration { get; set; }
        public DateTime StartTime { get; set; }
        public int Cost { get; set; }
    }
}
