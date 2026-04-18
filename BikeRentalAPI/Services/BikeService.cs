using BikeRentalAPI.Database;
using BikeRentalAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BikeRentalAPI.Services
{
    public class BikeService : IBikeService
    {
        private readonly BikeRentContext _context;

        public BikeService(BikeRentContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Bike>> GetBikesAsync()
        {
            return await _context.Bike.ToListAsync();
        }

        public async Task<Bike?> GetBikeByIdAsync(int id)
        {
            return await _context.Bike.FindAsync(id);
        }

        public async Task<IEnumerable<string>> GetUniqueBrandsAsync()
        {
            var brands = await _context.Bike
                .Select(b => b.Brand) 
                .Distinct()
                .ToListAsync();

            return brands;
        }
        public async Task<IEnumerable<string>> GetUniqueTypeAsync()
        {
            var brands = await _context.Bike
                .Select(b => b.Type)
                .Distinct()
                .ToListAsync();

            return brands;
        }
        public async Task<Bike> AddBikeAsync(Bike bike)
        {
            _context.Bike.Add(bike);
            await _context.SaveChangesAsync();
            return bike;
        }

        public async Task<bool> UpdateBikeStatusAsync(int id, string status)
        {
            var bike = await _context.Bike.FindAsync(id);
            if (bike == null) return false;

            bike.Status = status;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateRentalAmountAsync(int id, int rentalAmount)
        {
            var bike = await _context.Bike.FindAsync(id);
            if (bike == null) return false;

            bike.RentalAmount = rentalAmount;
            _context.Entry(bike).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateBikeCountAsync(int id, int count)
        {
            var bike = await _context.Bike.FindAsync(id);
            if (bike == null) return false;

            bike.BikeCount = count;
            _context.Entry(bike).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteBikeAsync(int id)
        {
            var bike = await _context.Bike.FindAsync(id);
            if (bike == null) return false;

            _context.Bike.Remove(bike);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
