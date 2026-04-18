using BikeRentalAPI.Models;

namespace BikeRentalAPI.Services
{
    public interface IBikeService
    {
        Task<IEnumerable<Bike>> GetBikesAsync();
        Task<Bike?> GetBikeByIdAsync(int id);
        Task<IEnumerable<string>> GetUniqueBrandsAsync();
        Task<IEnumerable<string>> GetUniqueTypeAsync();
        Task<Bike> AddBikeAsync(Bike bike);
        Task<bool> UpdateBikeStatusAsync(int id, string status);
        Task<bool> UpdateRentalAmountAsync(int id, int rentalAmount);
        Task<bool> UpdateBikeCountAsync(int id, int count);
        Task<bool> DeleteBikeAsync(int id);
    }
}
