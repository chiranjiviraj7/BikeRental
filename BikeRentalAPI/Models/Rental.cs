using System.ComponentModel.DataAnnotations;

namespace BikeRentalAPI.Models
{
    public class Rent
    {
        [Key]
        public int RentalId { get; set; }
        public int BikeId { get; set; }
        public Bike Bike { get; set; }  // Foreign Key relationship
        public int CustId { get; set; }
        public Customer Customer { get; set; }  // Foreign Key relationship
        
        public int Duration { get; set; }
        public int Cost { get; set; }
        public required string Status { get; set; }
        public DateTime StartTime { get; set; }
    }
}
