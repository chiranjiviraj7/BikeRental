using System.ComponentModel.DataAnnotations;

namespace BikeRentalAPI.Models
{
    public class Bike
    {
        [Key]
        public int BikeId { get; set; }
        public required string BikeName { get; set; }
        public required string Brand { get; set; }
        public required string Type { get; set; }
        public required string Status { get; set; }
        public int RentalAmount { get; set; }
        public string? ImageUrl { get; set; }
        public int BikeCount { get; set; }
        public string BikeDetails { get; set; }
    }
}
