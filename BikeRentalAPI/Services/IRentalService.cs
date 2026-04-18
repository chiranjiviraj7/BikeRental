using BikeRentalAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BikeRentalAPI.Services
{
    public interface IRentalService
    {
        Task<IEnumerable<Rent>> GetRentalsAsync();
        Task<Rent> RentBikeAsync(RentRequestModel model);
        Task<int> ReturnBikeAsync(ReturnRequestModel model);
        Task<Customer> GetCustomerByNameAsync(string name);
        Task<IEnumerable<Rent>> GetRentalsByCustomerAsync(string name, string phone);
        Task<IEnumerable<RentalHistoryDto>> GetRentalHistoryAsync(int bikeId);
        Task<IEnumerable<Customer>> GetCustomersByBikeAsync(int bikeId);
        Task<IEnumerable<int>> GetActiveRentalsAsync();

    }
}
