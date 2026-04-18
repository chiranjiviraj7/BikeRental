using BikeRentalAPI.Database;
using BikeRentalAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BikeRentalAPI.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly BikeRentContext _context;

        public CustomerService(BikeRentContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Customer>> GetCustomersAsync()
        {
            return await _context.Customer.ToListAsync();
        }

        public async Task<Customer?> GetCustomerByIdAsync(int id)
        {
            return await _context.Customer.FindAsync(id);
        }

        public async Task<Customer?> GetCustomerByNameAsync(string name)
        {
            var lowerName = name.ToLower();
            return await _context.Customer.FirstOrDefaultAsync(c => c.CustName.ToLower() == lowerName);
        }

        public async Task<Customer?> GetCustomerByNameAndPhoneAsync(string name, string phone)
        {
            return await _context.Customer.FirstOrDefaultAsync(c => c.CustName == name && c.CustPhNo == phone);
        }

        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            _context.Customer.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<bool> UpdateCustomerAsync(int id, Customer customer)
        {
            if (id != customer.CustId) return false;

            _context.Entry(customer).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        public async Task<bool> DeleteCustomerAsync(int id)
        {
            var customer = await _context.Customer.FindAsync(id);
            if (customer == null) return false;

            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
