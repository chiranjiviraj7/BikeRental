using BikeRentalAPI.Database;
using BikeRentalAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BikeRentalAPI.Services
{
    public class RentalService : IRentalService
    {
        private readonly BikeRentContext _context;

        public RentalService(BikeRentContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Rent>> GetRentalsAsync()
        {
            return await _context.Rent
                .Include(r => r.Bike)
                .Include(r => r.Customer)
                .ToListAsync();
        }

        public async Task<Rent> RentBikeAsync(RentRequestModel model)
        {
            var customer = await _context.Customer
                .FirstOrDefaultAsync(c => c.CustName == model.CustName);
            if (customer == null)
            {
                throw new Exception("Customer not found");
            }

            var bike = await _context.Bike
                .FirstOrDefaultAsync(b => b.BikeId == model.BikeId && b.Status == "1");
            if (bike == null)
            {
                throw new Exception("Bike not available");
            }

            int rentalCost = model.Duration * bike.RentalAmount;

            var rental = new Rent
            {
                BikeId = model.BikeId,
                CustId = customer.CustId,
                Duration = model.Duration,
                Cost = rentalCost,
                Status = "Active",
                StartTime = DateTime.Now
            };

            bike.BikeCount--;
            if (bike.BikeCount == 0)
            {
                bike.Status = "0";
            }

            _context.Rent.Add(rental);
            await _context.SaveChangesAsync();

            return rental;
        }

        public async Task<int> ReturnBikeAsync(ReturnRequestModel model)
        {
            var rental = await _context.Rent
                .Include(r => r.Bike)
                .FirstOrDefaultAsync(r => r.Customer.CustName == model.CustName && r.Customer.CustPhNo == model.CustPhNo && r.BikeId == model.BikeId && r.Status == "Active");

            if (rental == null)
            {
                throw new Exception("No active rental found for this bike");
            }

            int rentalDuration = rental.Duration;
            DateTime endTime = DateTime.Now;
            DateTime startTime = (DateTime)rental.StartTime;

            double totalTimeRented = (endTime - startTime).TotalHours;
            if (totalTimeRented > rentalDuration)
            {
                double extraTime = totalTimeRented - rentalDuration;
                int extraCharges = (int)Math.Ceiling(extraTime) * 60;

                rental.Cost += extraCharges;
            }
            rental.Bike.BikeCount++;
            rental.Bike.Status = rental.Bike.BikeCount > 0 ? "1" : "0";
            rental.Status = "Returned";
            int cost = rental.Cost;
            await _context.SaveChangesAsync();

            return cost;
        }

        public async Task<Customer> GetCustomerByNameAsync(string name)
        {
            var lowerName = name.ToLower();

            var customer = await _context.Customer
                .FirstOrDefaultAsync(c => c.CustName.ToLower() == lowerName);

            if (customer == null) throw new Exception("Customer not found.");
            return customer;
        }

        public async Task<IEnumerable<Rent>> GetRentalsByCustomerAsync(string name, string phone)
        {
            var lowerName = name.ToLower();
            var lowerPhone = phone.ToLower();

            var rentals = await _context.Rent
                .Include(r => r.Bike)
                .Include(r => r.Customer)
                .Where(r => r.Customer.CustName.ToLower() == lowerName && r.Customer.CustPhNo.ToLower() == lowerPhone && r.Status == "Active")
                .ToListAsync();

            if (rentals == null || rentals.Count == 0)
            {
                throw new Exception("No active rentals found for this customer.");
            }

            return rentals;
        }

        public async Task<IEnumerable<RentalHistoryDto>> GetRentalHistoryAsync(int bikeId)
        {
            var rentalHistory = await _context.Rent
                .Where(r => r.BikeId == bikeId)
                .Join(_context.Customer,
                      rental => rental.CustId,
                      customer => customer.CustId,
                      (rental, customer) => new RentalHistoryDto
                      {
                          CustName = customer.CustName,
                          CustPhNo = customer.CustPhNo,
                          Duration = rental.Duration,
                          StartTime = rental.StartTime,
                          Cost = rental.Cost
                      })
                .ToListAsync();

            return rentalHistory;
        }

        public async Task<IEnumerable<Customer>> GetCustomersByBikeAsync(int bikeId)
        {
            var rentals = await _context.Rent
                .Include(r => r.Customer)
                .Where(r => r.BikeId == bikeId && r.Status == "Active")
                .Select(r => r.Customer)
                .Distinct()
                .ToListAsync();

            if (rentals == null || rentals.Count == 0)
            {
                throw new Exception("No active rentals found for this bike.");
            }

            return rentals;
        }

        /*public async Task<IEnumerable<Rent>> GetActiveRentalsAsync()
        {
            return await _context.Rent
                .Include(r => r.Bike)
                .Include(r => r.Customer)
                .Where(r => r.Status == "Active")
                .ToListAsync();
        }*/
        public async Task<IEnumerable<int>> GetActiveRentalsAsync()
        {
            return await _context.Rent
                .Where(r => r.Status == "Active")
                .Select(r => r.CustId)  // Only select CustId
                .Distinct()  // To ensure unique customer IDs
                .ToListAsync();
        }
    }
}
