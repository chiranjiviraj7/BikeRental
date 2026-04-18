using System.ComponentModel.DataAnnotations;

namespace BikeRentalAPI.Models
{
    public class Customer
    {
        [Key]
        public int CustId { get; set; }
        public string CustName { get; set; }
        public string CustPhNo { get; set; }
    }
}
